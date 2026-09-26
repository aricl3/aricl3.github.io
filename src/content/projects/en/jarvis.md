---
title: "Jarvis"
summary: "A local-first personal work console for Mac, built around tool approval, context management, and pluggable agent capabilities."
role: "Independent Developer / Product Designer"
period: "Aug 2026 — Present"
domain: "Local-first AI Agent · Personal Productivity"
status: "Private build · In active development"
metrics:
  - label: "Backend tests"
    value: "95"
  - label: "Operation"
    value: "Local-first"
stack: ["Pydantic AI", "FastAPI", "React", "SQLite", "Ollama", "MCP"]
highlights:
  - "Paused side-effecting tool calls for explicit user approval before resuming execution"
  - "Separated the complete conversation archive from the model's active, compactable context"
  - "Organized search, files, documents, coding, and Mac tools as pluggable capabilities"
links: []
lang: en
translationKey: jarvis
featured: true
caseStudy: true
order: 4
---

## Context

Many agent products begin by giving a model more tools. Once those tools can access files, terminals, and external services, a harder set of questions emerges: **Can the user see what the agent is about to do? Can they stop a side effect before it happens? Can a long-running conversation remain understandable and controllable?**

Jarvis is a **local-first personal work console for Mac** that I am building for my own workflows. It is not intended to be a fully autonomous, general-purpose agent gateway. It is an ongoing exploration of how an agent can participate reliably in real work.

## My role

I independently own the **product definition, system architecture, backend and frontend implementation, and testing baseline**. The project started in **August 2026**, remains privately developed, and is validated primarily through my day-to-day workflows.

## Core workflow

For each task, the user can choose a local or cloud model and enable capabilities such as search, files, documents, coding, Skills, and MCP. The agent streams its execution state to the interface. When a tool may create a side effect, execution pauses for explicit approval or denial and then resumes from the original context.

Each conversation keeps two information layers: a **complete message archive** for traceability and a bounded **active context** sent to the model. As a conversation grows, the active context can be compacted automatically or manually without deleting the full history.

![Jarvis current architecture: interface, agent core, approval gate, context manager, and pluggable capabilities](/images/projects/jarvis/architecture.svg)

## Key decisions

### Make tool execution visible and interruptible

Approval is not merely a warning rendered in the chat interface. It is a real suspension point in the execution path. Tool calls that require confirmation are deferred, the UI receives an approval request through the event stream, and the agent resumes only after the user decides. File and terminal operations therefore do not depend solely on the model behaving cautiously.

![Jarvis displays the exact terminal command and pauses before the write operation for explicit approval or denial](/images/projects/jarvis/jarvis-approval-gate.webp)

*The write has not happened yet: the user can inspect the command before approving or denying it.*

### Separate the archive from model context

A complete history is valuable for review and audit, but repeatedly sending an ever-growing transcript to the model is inefficient and unstable. Jarvis manages the **traceable archive** separately from the **bounded active context**, preserving history while controlling what the model receives.

### Keep the core thin and capabilities pluggable

Search, filesystem, terminal, document, and MCP integrations are organized as capability modules rather than being embedded in one agent loop. The local path uses **Qwen3.5 9B / Qwen3.8 27B**, while cloud models can be selected per task, making privacy, quality, latency, and cost explicit tradeoffs.

## Current validation

The current version has **95 automated backend tests**, and the frontend completes a production build. The suite covers conversations, model configuration, tool execution, approval, context compaction, and selected safety boundaries. These numbers represent an engineering baseline, not a claim that the product is mature or security-audited. Because the project is still being optimized, I am not publishing usage volume, success-rate, or productivity claims without continuous measurements.

![After approval, Jarvis resumes execution and verifies that all three target headings were written](/images/projects/jarvis/jarvis-verified-result.webp)

*The same run resumes after approval and verifies the result with read-only tool calls.*

## Current status and next step

Jarvis remains a **private build in active development**; its source repository is not currently public. The implementation already supports local conversations, tool execution, approval and resumption, and context management. Several important capabilities are still being designed or built:

- A unified Artifact Registry and file-results interface
- Persistent Runs / Steps and a truly recoverable stop mechanism
- Stronger execution isolation and provenance-aware context projection

The current terminal restrictions are best-effort application safeguards, not an operating-system sandbox. The next phase is to evolve Jarvis from a useful personal agent into a **work system that is observable, recoverable, and auditable**.

## Related notes

- [A local agent that actually stops: the approval path from model to UI](/en/notes/stoppable-local-agent/)
- [A complete chat history should not be the model context](/en/notes/archive-vs-active-context/)
