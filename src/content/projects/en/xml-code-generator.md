---
title: "LLM-based XML Code Generator"
summary: "Turning business requirements into compilable XML through data engineering, model fine-tuning, and multi-layer evaluation for reliable structured generation."
role: "AI Project Engineer"
period: "Apr 2025 — Jul 2025"
domain: "Code Generation · Fine-tuning"
status: "Prototype validated"
metrics:
  - label: "Team"
    value: "~5 people"
  - label: "First-line accuracy"
    value: "40% → 100%"
  - label: "Parse success"
    value: "20% → 91%"
stack: ["Qwen", "LoRA", "SFT", "Prompt engineering", "XML Parser", "BLEU"]
highlights:
  - "Built the generation and evaluation path from requirement semantics to compilable XML"
  - "Established data admission with LLM augmentation, automated validation, and human review"
  - "Improved complex-format generation through Qwen LoRA / SFT fine-tuning"
lang: en
translationKey: xml-code-generator
featured: true
caseStudy: true
order: 3
---

## Context

An internal business system required engineers to translate requirement documents into complex, tightly constrained XML, which was then compiled into downstream business code. The original workflow depended on engineers interpreting each requirement and writing the XML manually, making batch delivery time-consuming.

This project explored converting **natural-language business requirements directly into compilable XML**, shortening the batch code-production cycle while reducing recurring structural and field-level errors.

## My role

I owned **solution design, training-data collection and curation, Qwen LoRA / SFT fine-tuning, prompt-level format constraints, evaluation metrics, and test-set construction**, working with a team of around five people through model development and prototype validation.

## Core workflow

A user submits a requirement document or a semantic description of a specific business need. The model generates XML, which is then checked for parseability, structural validity, and business-rule compliance before eligible output can be compiled into downstream business code.

## Core challenges

### Generate complex XML reliably

The dominant failures fell into three groups: **unparseable XML or unclosed tags**, missing nodes or incorrect hierarchy and order, and field values that violated business rules. These represent syntax validity, structural completeness, and business correctness, so no single text-similarity metric was sufficient.

### Admit synthetic data safely

We used LLM-assisted augmentation to improve complex-sample coverage, backed by a gated data pipeline: **XML parsing → schema and business-rule validation → deduplication and anomaly filtering → human sampling or secondary annotation → admission of only parseable or compilable samples**.

### Balance data and training stability

Complex-sample augmentation improved not only dataset size but also its distribution. During fine-tuning, parameters such as batch size and warmup were adjusted to help the model learn long structures, hierarchy, and field constraints more consistently.

## Evaluation and results

Evaluation covered XML parse success, exact-match code accuracy, node- and field-level accuracy, first-line accuracy, and BLEU. In project evaluation, **first-line accuracy increased from 40% to 100%**, while **XML parse success increased from 20% to 91%**.

The project received an **internal innovation award**. It also reinforced that domain code generation depends on more than model scale: data quality, format constraints, and task-representative evaluation are equally important.

## Project boundary

Model development and prototype validation ran from April to July 2025; deployment and internal-system integration were not completed. Because the work involves confidential internal information, this case study does not expose the organization name, requirement samples, system screenshots, demos, source code, or integration details.
