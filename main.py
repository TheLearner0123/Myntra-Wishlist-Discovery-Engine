import os
import json
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from nlp_engine import MULTI_SOURCE_CORPUS, get_engine_statistics, answer_discovery_question

app = FastAPI(
    title="Myntra AURA-Discovery™ AI Backend API",
    description="AI-Powered Growth Engine for Non-Monetary Wishlist-to-Purchase Conversion",
    version="2.4.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class QueryRequest(BaseModel):
    query: str

class ICEEvaluationRequest(BaseModel):
    impact: float
    confidence: float
    ease: float

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "engine": "AURA-Discovery NLP Core",
        "active_signals": len(MULTI_SOURCE_CORPUS),
        "constraint": "Zero Monetary Incentives"
    }

@app.get("/api/discovery/stats")
def get_stats():
    return get_engine_statistics()

@app.get("/api/discovery/feed")
def get_feed(
    source: Optional[str] = "all",
    cluster: Optional[str] = "all",
    search: Optional[str] = None
):
    results = MULTI_SOURCE_CORPUS
    if source and source != "all":
        results = [r for r in results if source.lower() in r["source"].lower()]
    if cluster and cluster != "all":
        results = [r for r in results if cluster.lower() in r["rootCauseCluster"].lower()]
    if search:
        s = search.lower()
        results = [r for r in results if s in r["quote"].lower() or s in r["author"].lower() or s in r.get("category", "").lower()]
    return {
        "count": len(results),
        "signals": results
    }

@app.post("/api/discovery/query")
def process_query(payload: QueryRequest):
    return answer_discovery_question(payload.query)

@app.get("/api/discovery/ice-opportunities")
def get_ice_opportunities():
    return [
        {
            "id": "OPP-1",
            "name": "Real-Body Fit-Twin Review & Drape Engine",
            "cluster": "Fit & Silhouette Uncertainty",
            "targetVolume": "34.8% of Wishlists",
            "impact": 9.4,
            "confidence": 9.1,
            "ease": 7.5,
            "iceScore": 8.7,
            "projectedLift": "+32% 30-Day Conversion Lift",
            "nonMonetaryMechanism": "Matches user height/weight/chest with real reviewer photos, 5-sec walking/sitting video clips, and cross-brand size translation."
        },
        {
            "id": "OPP-2",
            "name": "1-Tap WhatsApp Social Co-Shopping Polls",
            "cluster": "Social Validation Void",
            "targetVolume": "15.0% of Wishlists",
            "impact": 8.9,
            "confidence": 8.7,
            "ease": 8.8,
            "iceScore": 8.8,
            "projectedLift": "+28% 30-Day Conversion Lift",
            "nonMonetaryMechanism": "Generates a lightweight interactive poll link for friends to vote; real-time votes appear on the user's wishlist card."
        },
        {
            "id": "OPP-3",
            "name": "Interactive Mix-and-Match Outfit Studio",
            "cluster": "Styling & Wardrobe Synergy",
            "targetVolume": "23.4% of Wishlists",
            "impact": 8.8,
            "confidence": 8.5,
            "ease": 8.2,
            "iceScore": 8.5,
            "projectedLift": "+24% 30-Day Conversion Lift",
            "nonMonetaryMechanism": "Drag-and-drop canvas allowing users to pair wishlisted tops with their saved/past purchased bottoms and shoes."
        },
        {
            "id": "OPP-4",
            "name": "Sensory & Fabric Transparency Passport",
            "cluster": "Fabric & Sensory Ambiguity",
            "targetVolume": "18.2% of Wishlists",
            "impact": 8.0,
            "confidence": 8.3,
            "ease": 8.5,
            "iceScore": 8.3,
            "projectedLift": "+18% 30-Day Conversion Lift",
            "nonMonetaryMechanism": "Standardized Opacity Scale (1-5), GSM fabric weight, Daylight toggle, and 30-Day Verified Post-Wash Durability Badge."
        },
        {
            "id": "OPP-5",
            "name": "Occasion Timeline & Capsule Staging",
            "cluster": "Occasion & Event Timing",
            "targetVolume": "13.6% of Wishlists",
            "impact": 7.6,
            "confidence": 7.9,
            "ease": 9.0,
            "iceScore": 8.1,
            "projectedLift": "+15% 30-Day Conversion Lift",
            "nonMonetaryMechanism": "Custom event boards (e.g. 'Diwali 2026', 'Goa Trip') with outfit completeness checklists and timely styling prompts."
        }
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
