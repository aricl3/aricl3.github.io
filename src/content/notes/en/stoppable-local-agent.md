---
title: "A local agent that actually stops"
description: "Why asking for confirmation in chat is not an approval mechanism, and how Jarvis pauses, persists, and resumes tool calls before side effects occur."
publishedAt: 2026-09-26
tags: ["AI Agents", "Human-in-the-loop", "Engineering"]
lang: en
translationKey: stoppable-local-agent
draft: false
---

When an agent can only answer questions, a mistake is usually just a poor piece of text. Once it can modify files, run shell commands, update calendars, or call external services, the same mistake becomes a real side effect.

The obvious first safeguard is an instruction such as:

> Ask the user before performing a dangerous action.

That is not an approval mechanism. It is behavioral advice to a model.

While building [Jarvis](/en/projects/jarvis/), I came to treat human-in-the-loop control as an execution-system problem: **the pause must happen at the tool boundary, not in natural language, and the original execution must remain resumable after the decision.**

## Why conversational confirmation is unreliable

Prompt-only approval has at least three failure modes.

First, the model may call a tool and only then explain what it did. For a file write or sent email, the first side effect has already happened.

Second, models do not interpret “dangerous” consistently. A smaller local model may respond with “Shall I continue?” without producing any durable tool state that the system can resume.

Third, a chat reply is not reliably bound to a particular tool call. If the user says “yes,” which command, argument set, or group of calls did they approve?

Jarvis therefore uses a stronger contract:

> The user approves a set of pending requests with explicit IDs, tool names, and arguments—not a prose description of the plan.

## Approval belongs before the side effect

Jarvis evaluates a policy before a tool executes. The current policy primarily covers:

- shell commands outside a known read-only set;
- mutating mail, calendar, file, and productivity tools exposed through MCP.

Read-only commands such as `pwd`, `ls`, `cat`, and `git diff` can run directly. Commands that cannot be parsed or do not match the safe set require confirmation. The application makes this decision from the tool name and arguments instead of asking the model to classify its own risk.

When the policy matches, the tool does not run. The agent produces a deferred request containing:

```text
tool_call_id
tool_name
arguments
```

Those fields define the approval object. The backend persists both the active model context and the pending request, so a refresh or brief disconnect does not turn the pause into an unrecoverable chat message.

![Jarvis displays a terminal command and waits for explicit approval or denial before writing](/images/projects/jarvis/jarvis-approval-gate.webp)

## From model event to interface controls

The backend maps the deferred request to an `approval_needed` event and sends it through the SSE stream. The frontend updates the original tool card with the exact arguments and renders Approve and Deny controls.

One distinction matters: **the interface is not the source of truth for approval state.**

The pending set lives on the backend. A submitted decision must cover every pending tool-call ID exactly once. Missing, duplicated, or unknown IDs do not enter the resume path.

This gives individual decisions, Approve All, and Deny All the same consistency rule instead of trusting whatever the browser currently displays.

## Approval resumes execution; it does not ask again

After approval, Jarvis does not append “the user said yes” as a new prompt and ask the model to reconstruct its plan. The backend builds deferred tool results and passes them back with the same active context, preserving the execution semantics of the interrupted run.

The full path is:

```text
model proposes a tool call
  → policy intercepts it
  → pending request is persisted
  → SSE exposes the tool and arguments
  → user approves or denies each request
  → DeferredToolResults are built
  → execution resumes from the existing context
```

While approval is pending, Jarvis also blocks two operations that could invalidate that state: sending a new user message and compacting the active context. The existing decision must be resolved before another execution branch begins.

![After approval, Jarvis resumes and verifies the result with read-only commands](/images/projects/jarvis/jarvis-verified-result.webp)

## Denial is a valid result

An approval system should not treat denial as an exception. For the agent, denial is an explicit tool result: the operation was not authorized, so it should explain, adjust the plan, or find a non-mutating alternative.

That differs from execution failure. Failure means the tool ran but did not succeed; denial means it should not run at all. Mixing them encourages repeated requests or false claims that the task completed.

## This is still not a security sandbox

The current design provides **application-level approval and resumption**, not complete host isolation.

- command classification relies on rules and argument parsing;
- workspace and working-directory limits reduce the blast radius but are not OS isolation;
- approving one command does not imply that every downstream behavior is understood;
- Stop currently behaves more like aborting the client stream than a durable, recoverable run cancellation.

I therefore would not describe Jarvis as “safe execution of arbitrary commands.” It has an observable, interruptible, resumable approval boundary. Stronger step isolation, persistent runs, and operating-system controls remain future work.

## The questions I now use to evaluate approval systems

A credible agent-approval feature should answer at least five questions:

1. Does the side effect occur before or after approval?
2. Is the user approving a specific tool, argument set, and call ID?
3. Is pending state durable while the system waits?
4. Can both approval and denial resume the original execution?
5. Can new messages, compaction, or disconnects corrupt the pending state?

If a product can render a confirmation button but cannot answer these questions, it may have an approval interface rather than an approval mechanism.

The next note examines a related recovery problem: [why a complete conversation archive should not be identical to model context](/en/notes/archive-vs-active-context/).
