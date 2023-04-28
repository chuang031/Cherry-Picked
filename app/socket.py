from flask_socketio import SocketIO, emit, join_room
from flask_login import current_user
import os
from app.models.user import Chat, db

# configure cors_allowed_origins


# initialize your socket instance
socketio = SocketIO(cors_allowed_origins="*")


# handle chat messages

@socketio.on("connect")
def connection():
    pass


@socketio.on('join')
def on_join(data):
    print(data, '+++++++++++++++++++++++++')
    username = data['username']
    room = data['room']
    join_room(room)
    emit(username + ' has entered the room.', to=room)

@socketio.on("chat")
def handle_chat(data):
    print(data)
   
    message= Chat(sender_id = current_user.id,
                message = data['msg'],
                recipient_id = data['recipientId'],
                roomId = data['room'])
    db.session.add(message)
    db.session.commit()
    emit("chat", data )