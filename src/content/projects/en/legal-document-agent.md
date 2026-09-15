---
title: "Legal Memo Agent Workflow"
summary: "A legal-memo workflow for lawyers that improves source retrieval and final memo usefulness through retrieval diagnostics, reranking, prompt orchestration, and expert evaluation."
role: "Data Scientist / Memo Agent Algorithm Lead"
period: "Feb 2026 — May 2026"
domain: "Legal Tech · Generative AI"
status: "Production delivery"
metrics:
  - label: "Expert quality"
    value: "≈50% → 80%+"
stack: ["LangGraph", "DSPy", "RAG", "LLM evaluation", "API integration"]
highlights:
  - "Used expert-defined target snippets and retrieval-funnel analysis to locate recall and ranking failures"
  - "Combined relevance and semantic signals while improving query-keyword generation"
  - "Used expert evaluation and prompt orchestration to improve overall quality by about 30 percentage points"
lang: en
translationKey: legal-document-agent
featured: true
caseStudy: true
order: 2
---

## Context

Legal memoranda help lawyers organize key facts, applicable rules, and supporting authorities during case research, litigation preparation, and legal analysis. Before this project, finding the relevant material and drafting the memo relied primarily on manual work by lawyers.

The project introduced a **legal memo agent workflow** for lawyers. A lawyer submits a legal query; the system retrieves relevant material from an internal database, organizes the available evidence, and assists with drafting the memo. The workflow supports legal research and writing—it does not replace professional legal judgment.

## My role

I owned the **end-to-end algorithmic workflow for the Memo Agent**, from requirement clarification through model evaluation. My work included translating product requirements with the product manager, retrieval and reranking, agent workflow design, localized prompt strategies, evaluation methodology, and code testing.

Deployment and subsequent production engineering were handled by other team members.

## Core workflow

The public-facing workflow can be summarized in five stages:

1. A lawyer submits a legal query;
2. The system retrieves and ranks relevant legal material;
3. The agent analyzes and organizes the material and drafts the memo;
4. Citations and factual claims are checked;
5. Quality evaluation and professional feedback guide further improvement.

This is a high-level capability loop for public communication, not a representation of the complete production topology.

## Core challenges

### Trace generation problems through the retrieval funnel

The early failures could not be reduced to “poor generation.” Legal professionals first reviewed the task and supplied target snippets as expected retrieval results. I then used **retrieval-funnel analysis** to trace whether each target entered the candidate set, how its position changed across stages, and where it was filtered out.

This separated two failure modes: the correct material was never retrieved, or it was retrieved but ranked too low. That distinction made it possible to optimize the failing stage instead of repeatedly changing the entire generation workflow.

### Improve recall and ranking separately

When correct material ranked too low, I adjusted the ranking approach to combine **relevance and semantic signals**. When target material was not retrieved at all, I improved query-keyword generation so that the retrieval request expressed the underlying legal need more precisely.

Together, these changes turned keyword generation, retrieval, and ranking into an observable pipeline that could be diagnosed and improved stage by stage.

### Make retrieval improvements matter to the final memo

Retrieval quality was only an intermediate result. To determine whether an iteration actually helped lawyers, I combined retrieval-funnel analysis with review by legal professionals: the funnel showed how target material survived each stage, while expert review assessed the final answer under a consistent scoring approach.

Using the same evaluation criteria and comparable samples, the **expert-assessed overall quality score improved from approximately 50% to over 80%—an increase of about 30 percentage points—and exceeded the target threshold**.

## Reflection

The most important lesson was that high-quality legal generation depends on more than the model itself. The workflow must retrieve the right evidence and use deliberate **prompt orchestration** to help the model understand the task, organize its sources, and produce material in the required form.

By separating final quality into an observable retrieval funnel and an expert-evaluation loop, algorithmic improvements became easier to locate, validate, and iterate.
