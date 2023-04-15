from flask_socketio import SocketIO, emit
import os


# configure cors_allowed_origins


# initialize your socket instance
socketio = SocketIO(cors_allowed_origins="*")


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)