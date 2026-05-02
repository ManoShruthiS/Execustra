"""Reflection service — analyzes reflection data for insights."""


class ReflectionService:
    """Service for analyzing user reflections."""

    def analyze_patterns(self, reflections: list[dict]) -> dict:
        """Analyze reflection patterns for behavioral insights."""
        if not reflections:
            return {"insights": [], "mood_trend": "neutral", "common_blockers": []}

        # Extract common themes from blockers
        blocker_counts: dict[str, int] = {}
        for r in reflections:
            blocked_text = r.get("blocked", "").lower()
            for keyword in ["time", "motivation", "energy", "focus", "clarity", "overwhelm"]:
                if keyword in blocked_text:
                    blocker_counts[keyword] = blocker_counts.get(keyword, 0) + 1

        common_blockers = sorted(blocker_counts.items(), key=lambda x: x[1], reverse=True)[:3]

        # Calculate completion sentiment
        completion_lengths = [len(r.get("completed", "")) for r in reflections]
        avg_length = sum(completion_lengths) / len(completion_lengths) if completion_lengths else 0

        insights = []
        if avg_length > 100:
            insights.append("You tend to write detailed reflections — this shows strong self-awareness.")
        if common_blockers:
            top_blocker = common_blockers[0][0]
            insights.append(f"'{top_blocker.title()}' appears frequently in your blockers. Consider addressing this.")

        return {
            "insights": insights,
            "mood_trend": "improving" if avg_length > 50 else "neutral",
            "common_blockers": [b[0] for b in common_blockers],
            "total_reflections": len(reflections),
        }
