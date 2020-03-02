import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import werkzeug

UPLOAD_FOLDER = "./data"
app = Flask(__name__, static_folder=None)
CORS(app)

@app.route("/files/<string:file_name>", methods=["POST"])
def upload_file(file_name):
    file = request.files["file"]
    filename = secure_filename(file_name)
    if not os.path.exists(os.path.join(UPLOAD_FOLDER, filename)):
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        resp = jsonify({"message": "File successfully uploaded"})
        resp.status_code = 201
    else:
        resp = jsonify({"message": "The specified file name already exists"})
        resp.status_code = 201
    return resp


@app.route("/files/<string:file_name>", methods=["DELETE"])
def delete_file(file_name):
    filename = secure_filename(file_name)
    if os.path.exists(os.path.join(UPLOAD_FOLDER, filename)):
        os.remove(os.path.join(UPLOAD_FOLDER, filename))
        resp = jsonify({"message": "File successfully deleted"})
        resp.status_code = 201
    else:
        resp = jsonify({"message": "Couldn't find the spedified name of the file "})
        resp.status_code = 201
    return resp


@app.route("/files", methods=["GET"])
def get_file_list():
    resp = jsonify({"message": "File List successfully downloaded"})
    file_list = []
    for file in os.listdir(UPLOAD_FOLDER):
        file_list.append(file)
    file_list_cat = ",".join(file_list)
    print(file_list_cat)
    resp.data = "[" + file_list_cat + "]"
    resp.status_code = 201
    return resp


@app.errorhandler(werkzeug.exceptions.RequestEntityTooLarge)
def handle_over_max_file_size(error):
    print("werkzeug.exceptions.RequestEntityTooLarge")
    return "result : file size is overed."


if __name__ == "__main__":
    app.run()
