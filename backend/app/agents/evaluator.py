"""Evaluator Agent — Analyzes task completion patterns."""


class EvaluatorAgent:
    """AI agent that evaluates user task completion performance."""

    def evaluate_performance(self, task_history: list[dict]) -> dict:
        """Analyze task completion patterns and return evaluation."""
        if not task_history:
            return {
                "status": "new_user",
                "score": 0,
                "trend": "neutral",
                "feedback": "Start completing tasks to see your performance analysis.",
            }

        total_tasks = sum(day.get("total", 0) for day in task_history)
        total_completed = sum(day.get("completed", 0) for day in task_history)
        overall_rate = (total_completed / total_tasks * 100) if total_tasks > 0 else 0

        # Detect trends
        if len(task_history) >= 3:
            recent = task_history[-3:]
            rates = [d.get("rate", 0) for d in recent]
            if all(rates[i] <= rates[i + 1] for i in range(len(rates) - 1)):
                trend = "improving"
            elif all(rates[i] >= rates[i + 1] for i in range(len(rates) - 1)):
                trend = "declining"
            else:
                trend = "stable"
        else:
            trend = "insufficient_data"

        # Generate feedback
        if overall_rate >= 80:
            feedback = "Excellent execution! You're building strong consistency."
        elif overall_rate >= 60:
            feedback = "Good progress. Focus on completing all tasks to build momentum."
        elif overall_rate >= 40:
            feedback = "You're showing effort. Consider reducing task complexity."
        else:
            feedback = "Let's simplify your tasks. Start with just one task per day."

        return {
            "status": "evaluated",
            "score": round(overall_rate, 1),
            "trend": trend,
            "feedback": feedback,
            "total_days": len(task_history),
            "total_tasks": total_tasks,
            "total_completed": total_completed,
        }
