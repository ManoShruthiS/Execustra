"""Reflection Analyzer Agent — Extracts behavioral insights from reflections."""


class ReflectionAnalyzerAgent:
    """AI agent that analyzes reflection data for behavioral patterns."""

    KEYWORD_CATEGORIES = {
        "motivation": ["motivation", "lazy", "energy", "tired", "dont feel like", "unmotivated"],
        "clarity": ["confused", "unclear", "dont know", "lost", "direction", "what to do"],
        "overwhelm": ["overwhelm", "too much", "stressed", "anxiety", "burned out", "burnout"],
        "progress": ["completed", "finished", "learned", "improved", "grew", "better"],
        "social": ["alone", "nobody", "no support", "isolated", "help"],
    }

    def analyze(self, reflections: list[dict]) -> dict:
        """Analyze reflections and extract behavioral insights."""
        if not reflections:
            return {
                "patterns": [],
                "dominant_theme": None,
                "recommendations": ["Start reflecting daily to unlock behavioral insights."],
            }

        # Count keyword occurrences across all categories
        category_scores: dict[str, int] = {}
        for reflection in reflections:
            text = " ".join([
                reflection.get("completed", ""),
                reflection.get("blocked", ""),
                reflection.get("learned", ""),
            ]).lower()

            for category, keywords in self.KEYWORD_CATEGORIES.items():
                for keyword in keywords:
                    if keyword in text:
                        category_scores[category] = category_scores.get(category, 0) + 1

        # Determine dominant theme
        dominant = max(category_scores.items(), key=lambda x: x[1])[0] if category_scores else None

        # Generate recommendations
        recommendations = []
        if dominant == "motivation":
            recommendations.append("Consider starting with your easiest task to build momentum.")
        elif dominant == "clarity":
            recommendations.append("Focus on one specific sub-goal at a time.")
        elif dominant == "overwhelm":
            recommendations.append("Reduce to 1 task per day until you feel balanced.")
        elif dominant == "progress":
            recommendations.append("Great self-awareness! Consider increasing your challenge level.")

        return {
            "patterns": [{"category": k, "frequency": v} for k, v in sorted(category_scores.items(), key=lambda x: x[1], reverse=True)],
            "dominant_theme": dominant,
            "recommendations": recommendations or ["Keep reflecting — patterns will emerge over time."],
            "total_analyzed": len(reflections),
        }
