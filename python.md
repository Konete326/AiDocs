!pip install gTTS faster-whisper pyngrok fastapi uvicorn python-multipart nest_asyncio

import os
import sys
import threading
import nest_asyncio
import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pyngrok import ngrok
from gtts import gTTS
from faster_whisper import WhisperModel

# 1. Load Model directly on NVIDIA GPU
print("⚡ Loading NVIDIA CTranslate2 Whisper Model on T4 GPU...")
model = WhisperModel("base", device="cuda", compute_type="float16")
print("✅ NVIDIA GPU Model Loaded Successfully!")

NGROK_TOKEN = "3ExQcFGTe6u2IktEG4ZosIrnSSY_3eB18gKm1JdRQoBqoximz"

try:
    ngrok.kill()
except:
    pass
ngrok.set_auth_token(NGROK_TOKEN)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/voice-chat")
async def voice_chat(file: UploadFile = File(...)):
    try:
        temp_audio = "temp.wav"
        with open(temp_audio, "wb") as f:
            f.write(await file.read())

        segments, _ = model.transcribe(temp_audio, beam_size=5)
        text = " ".join([s.text for s in segments]).strip()
        if not text:
            text = "Generate project architecture and database schema"

        ai_reply = f"Voice Command Received: '{text}'. Processing software documentation."

        tts = gTTS(text=ai_reply, lang='en')
        tts.save("ai_reply.mp3")

        return JSONResponse(content={
            "userText": text,
            "aiReplyText": ai_reply,
            "audioUrl": "/api/get-audio"
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/api/get-audio")
def get_audio():
    return FileResponse("ai_reply.mp3", media_type="audio/mpeg")

# Connect Ngrok Public URL
nest_asyncio.apply()
public_url = ngrok.connect(8000)
print("\n" + "="*65)
print(f"🚀 LIVE VOICE API URL: {public_url.public_url}")
print("="*65 + "\n")

# Start Uvicorn Server in Background Thread to avoid Jupyter asyncio error
def run_app():
    uvicorn.run(app, host="0.0.0.0", port=8000)

thread = threading.Thread(target=run_app, daemon=True)
thread.start()
print("🎉 Voice Server is Active and Running in Background!")
