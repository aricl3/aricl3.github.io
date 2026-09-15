---
title: "Smart Agent Detector"
summary: "Combining semantic AI analysis, deterministic program analysis, and historical attack knowledge to produce evidence-backed smart-contract risk verdicts."
role: "Founder / Technical Lead"
period: "2026 — Present"
domain: "AI Agents · Web3 Security"
status: "In active development"
metrics:
  - label: "Team"
    value: "5+ people"
  - label: "Code"
    value: "400+ commits"
stack: ["LangGraph", "FastAPI", "React", "RAG", "AST / IR", "MLflow"]
highlights:
  - "Used role specialization and parallel execution to broaden semantic code analysis"
  - "Linked risk conclusions to deterministic code evidence through a structured evidence model"
  - "Retrieved and reranked historical risk fragments while using protocol templates to calibrate false positives"
links:
  - label: "GitHub"
    href: "https://github.com/SmartFortressLab"
lang: en
translationKey: smart-agent-detector
featured: true
caseStudy: true
order: 1
---

## Context

Smart-contract auditing still relies heavily on manual review and fixed-pattern detection. **Manual audits are expensive and difficult to scale** across the volume of contracts being launched. Rule-based tools are efficient, but they can be slow to adapt to novel attacks and have limited understanding of code semantics and broader context.

Smart Agent Detector combines **semantic AI analysis, deterministic program analysis, and historical attack knowledge** to provide explainable security analysis for contract auditors, individual investors, and Web3 teams.

## My role

I lead **system architecture, agent workflows, backend engineering, model evaluation, and team coordination**. The project is being developed by a cross-functional team of more than five people and has accumulated **over 400 commits**.

## Core workflow

A user submits a **contract address or contract source code**. The system runs a multi-stage analysis and produces a **risk assessment report with explanations and supporting code evidence**.

## Key decisions

### Give each agent a bounded responsibility

The multi-agent architecture uses **bounded responsibilities** to keep each node focused on a finer-grained analysis task. Parallel execution broadens semantic coverage and helps produce evidence tied to specific risk-relevant code fragments, while **workflow-level cost constraints** keep multiple agent nodes manageable.

### Evidence first, downgrade uncertainty

Generated conclusions must **corroborate deterministic code evidence**. Findings without sufficient evidence are downgraded instead of being presented as high-confidence verdicts, making the output easier to explain and review.

## Core challenge

### Align generated conclusions with code evidence

The hardest engineering problem was creating **a stable, traceable relationship between generated conclusions and deterministic evidence**.

We addressed it with a finer-grained **structured evidence model** that enables LLM outputs to reference specific evidence. This makes risk judgments not only generatable, but also explainable and reviewable.

### Turn historical cases into usable evidence

To make historical data actively support each judgment, we **segment risk-relevant code from past attack cases and attach metadata** such as risk type, provenance, and context. **Similarity retrieval and reranking** then surface the most relevant fragments as comparative evidence for the current contract, strengthening candidate risk findings and giving the LLM judge a better-grounded basis.

### Calibrate false positives caused by protocol code

LLMs can mistake legitimate protocol mechanics for malicious behavior. For known protocol structures, we define **reviewable pattern templates**. A match acts as **a calibration signal that increases confidence in expected behavior and downgrades the suspected risk**; it does not automatically label the code safe. This reduces false positives while preserving checks for contradictory evidence.

## Current status and next step

The project **started in 2026**. Its foundational engineering is complete, and the system continues to evolve. The next step is **a stronger historical-data retrieval system** that can bring past attack knowledge into current contract analysis more accurately and comprehensively.
