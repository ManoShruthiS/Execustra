"""Adaptation Agent — Dynamically adjusts difficulty and workload."""


class AdaptationAgent:
    """AI agent that adapts the system based on user behavior."""

    def adapt(self, evaluation: dict, profile: dict) -> dict:
        """Generate adaptation decisions based on evaluation and profile."""
        score = evaluation.get("score", 0)
        trend = evaluation.get("trend", "neutral")
        consistency = profile.get("consistency_level", "medium")

        adaptations = []

        # Rule 1: Low completion → reduce complexity
        if score < 40:
            adaptations.append({
                "type": "reduce_tasks",
                "new_task_count": 1,
                "reason": "Low completion rate — simplifying to build momentum",
            })

        # Rule 2: Declining trend → offer encouragement
        if trend == "declining":
            adaptations.append({
                "type": "adjust_difficulty",
                "direction": "easier",
                "reason": "Declining performance detected — reducing pressure",
            })

        # Rule 3: High performance → increase challenge
        if score > 85 and trend == "improving":
            adaptations.append({
                "type": "increase_challenge",
                "new_task_count": 3,
                "reason": "Strong performance — adding stretch goals",
            })

        # Rule 4: Stable and medium → maintain
        if not adaptations:
            adaptations.append({
                "type": "maintain",
                "reason": "Performance is balanced — maintaining current level",
            })

        return {
            "adaptations": adaptations,
            "applied": True,
        }
