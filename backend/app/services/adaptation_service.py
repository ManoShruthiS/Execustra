"""Adaptation service — adjusts difficulty based on user performance."""


class AdaptationService:
    """Service for adapting task difficulty based on behavioral data."""

    RULES = {
        "low_completion": {
            "threshold": 40,
            "action": "reduce_complexity",
            "description": "Reduce task complexity when completion rate is below 40%",
        },
        "high_consistency": {
            "threshold": 80,
            "action": "increase_difficulty",
            "description": "Increase difficulty when consistency exceeds 80%",
        },
        "overload": {
            "threshold": 2,
            "action": "simplify_workload",
            "description": "Simplify workload when user skips 2+ tasks consistently",
        },
    }

    def evaluate(self, completion_rate: float, streak: int, skip_count: int) -> dict:
        """Evaluate user performance and return adaptation recommendations."""
        recommendations = []

        if completion_rate < self.RULES["low_completion"]["threshold"]:
            recommendations.append({
                "action": "reduce_complexity",
                "reason": "Low completion rate detected",
                "suggestion": "Reduce to 2 simpler tasks tomorrow",
            })

        if completion_rate > self.RULES["high_consistency"]["threshold"] and streak >= 5:
            recommendations.append({
                "action": "increase_difficulty",
                "reason": "Consistent high performance",
                "suggestion": "Add a stretch challenge task",
            })

        if skip_count >= self.RULES["overload"]["threshold"]:
            recommendations.append({
                "action": "simplify_workload",
                "reason": "Overload signals detected",
                "suggestion": "Reduce to 1 essential task",
            })

        if not recommendations:
            recommendations.append({
                "action": "maintain",
                "reason": "Performance is balanced",
                "suggestion": "Continue current difficulty level",
            })

        return {
            "completion_rate": completion_rate,
            "streak": streak,
            "skip_count": skip_count,
            "recommendations": recommendations,
        }
