---
title: "A complete chat history should not be the model context"
description: "How Jarvis separates a traceable archive from active model context and compacts long conversations without deleting their history."
publishedAt: 2026-09-26
tags: ["AI Agents", "Context Engineering", "Engineering"]
lang: en
translationKey: archive-vs-active-context
draft: false
---

Many chat applications begin with a single `messages` array. The interface renders it, the database stores it, and every new turn sends the whole thing back to the model.

That design is simple and effective for short conversations. For a long-running agent that calls tools, it eventually merges three different concerns:

- the complete record a user expects to see;
- the audit archive the system should preserve;
- the context the model actually needs for the next step.

In [Jarvis](/en/projects/jarvis/), I split these into two layers: a **complete archive** and an **active context**. It looks like a storage decision, but it determines whether long-running work can be compacted, resumed, and explained.

## Why not keep sending the entire history?

An ever-growing transcript creates several direct problems.

The first is cost and latency. Even with a local model, repeatedly processing finished tool outputs, superseded plans, and intermediate explanations consumes context and inference time.

The second is attention pollution. More information does not necessarily make the current step easier. Stale plans, early false assumptions, and large tool returns can crowd out the constraints that matter now.

The third is product semantics. Deleting old messages to control context removes the user's audit trail; never deleting anything makes the model input grow without bound.

“Chat history” and “model memory” should therefore not be two names for the same data structure.

## Two histories, two responsibilities

Jarvis appends the complete archive in message batches. It supports:

- reconstructing the interface when a conversation is reopened;
- auditing model responses and tool calls;
- feeding full-text search;
- preserving the option to rebuild context when the compaction strategy changes.

Active context is a replaceable model input. It can begin as a copy of the archive, then evolve into a summary plus a recent message tail without matching the visible transcript turn for turn.

```text
complete archive (append-only)
  ├─ UI history
  ├─ audit and search
  └─ initial active context

active context (replaceable)
  ├─ summary
  ├─ recent messages
  └─ next model input
```

The database reflects this separation. Message batches hold the archive; `conversation_context` holds the current active messages, compaction count, and last-compacted timestamp. If an older conversation does not have active state yet, Jarvis backfills it once from the archive rather than rewriting all historical data during migration.

![Jarvis manages the complete archive, active context, and pluggable tools as separate concerns](/images/projects/jarvis/architecture.svg)

## Automatic and manual compaction have different triggers

With the current defaults, Jarvis automatically compacts active context after it exceeds **80 messages**, keeping roughly **24 recent messages** as a continuity tail. Compaction is incremental: an earlier summary can anchor the next summary instead of repeatedly starting from the oldest raw history.

The interface also provides a manual Compact action. This lets the user shrink context before the threshold—for example, when moving from exploration into implementation.

Both paths use the same summarization strategy, but their trigger semantics differ:

- automatic compaction runs only after the threshold is exceeded;
- manual compaction forces a pass even for shorter context.

Jarvis compares both message count and estimated tokens before and after compaction. It records a compaction only when one of them actually decreases.

## Why the recent tail still matters

A single global summary loses local structure. Tool-call IDs, recently produced paths, the user's latest correction, and the agent's current plan often depend on the exact order of the most recent turns.

The result is therefore not “replace everything with one paragraph.” It is:

> a structured summary of older history + a recent message tail.

The summary carries durable constraints and completed decisions; the tail preserves short-term execution continuity. The ratio still depends on the model window, task type, and tool density. The current 80/24 settings are engineering defaults, not universal values for every agent.

## Do not compact across a pending approval

Context compaction and tool approval create an easy-to-miss race.

Once the agent has produced a pending tool call, active context contains its call ID, arguments, and the message structure required to resume. Compacting at this point could alter or omit those exact details, leaving a later approval detached from the original request.

Jarvis therefore rejects manual compaction while an approval is pending. Automatic compaction also runs only after a turn finishes without pending requests. The frontend disables both Compact and new-message input to avoid creating a second semantic branch.

This suggests a broader rule:

> Summaries may compress meaning, but they should not cross an unfinished transaction boundary.

## Recovering information that left active context

Compaction is not deletion. The complete archive remains available and is indexed with SQLite FTS. The agent can call `search_past_messages` to recover content that has left active context or to find relevant fragments from another conversation.

This creates a third option between “always include it in the prompt” and “forget it completely”:

- frequently needed state stays active;
- older state remains in the archive;
- relevant pieces are retrieved when a step needs them.

It resembles RAG, except the retrieval corpus is the agent's own work history rather than an external knowledge base.

## A sound architecture does not eliminate summary risk

Layering resolves the conflict between preservation and model input, but it does not guarantee summary quality.

A summary can still:

- omit a constraint that becomes important later;
- turn an uncertain conclusion into a confirmed fact;
- merge two similar but distinct files, tools, or decisions;
- drift away from evidence through repeated incremental compaction.

The current UI therefore exposes active-message count and estimated tokens; the backend context status also records compaction count and last-compacted time. The complete archive remains intact. The more valuable next step is not endlessly tuning one threshold, but adding provenance pointers, key invariants, and step-specific context projection.

I also do not yet have enough continuous usage data to claim a particular time saving or success-rate improvement. The architectural property is what can be verified today: model input can shrink without making the user's history disappear.

## A more useful set of context questions

When designing long-running context, I now ask:

1. What must be preserved permanently for review and audit?
2. What must remain exact until the current transaction finishes?
3. What can be summarized while retaining its original source?
4. What is only needed by a particular step and can be retrieved on demand?
5. Can the system rebuild from the complete archive when summarization fails?

Only after separating these questions do “memory,” “context,” and “chat history” stop being vague synonyms.

For the control boundary before side effects occur, read [A local agent that actually stops](/en/notes/stoppable-local-agent/).
