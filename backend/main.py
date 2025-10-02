from flask import Flask, jsonify, request, make_response
import os
import json
from flask_cors import CORS
import redis

app = Flask(__name__)
CORS(app)

def cleanArray(arrRaw):
    newArr = []
    for obj in arrRaw:
        e = obj.decode('UTF-8')
        newArr.append(int(e))
    return newArr

def arrayRotate(group):
    r = redis.Redis(host='localhost', port=6379, db=0)
    if group == 1:
        #arrRaw = r.lrange('mapTextStudy:group1', 0, 5)
        lpop = r.lpop('mapTextStudy:group1').decode('UTF-8')
        r.rpush('mapTextStudy:group1', lpop)
        arr = int(lpop)
    else:
        #arrRaw = r.lrange('mapTextStudy:group2', 0, 5)
        lpop = r.lpop('mapTextStudy:group2').decode('UTF-8')
        r.rpush('mapTextStudy:group2', lpop)
        arr = int(lpop)
    return arr
# handle
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route('/store_result', methods=["POST", "OPTIONS"])
# get the top 1000 completions for the given prompt
def store_result():
    rawData = request.json
    print(rawData)
    with open('results/' + rawData['prolificID'] + '_' + rawData['UID'] + '.json', 'w', encoding='utf-8') as f:
        json.dump(rawData, f, ensure_ascii=False)
    return("success")

# add a new participant
@app.route('/reg_participant', methods=["GET","OPTIONS"])
def register():
    r = redis.Redis(host='localhost', port=6379, db=0)
    r.incr('mapTextStudy:numOfParticipant')
    numOfParticipant = r.get('mapTextStudy:numOfParticipant').decode('UTF-8')
    groupNumFlag = int(numOfParticipant) % 2
    if groupNumFlag == 0:
        group = 1
        arr = arrayRotate(group)
    else:
        group = 2
        arr = arrayRotate(group)
    #print(numOfParticipant)
    return jsonify({'groupNum': group, 'block': arr})

@app.route('/get_participant_num', methods=["GET","OPTIONS"])
def getTotalNum():
    r = redis.Redis(host='localhost', port=6379, db=0)
    numOfParticipant = r.get('mapTextStudy:numOfParticipant').decode('UTF-8')
    return jsonify({'NumberOfParticipant': numOfParticipant})

@app.route('/reset_participant/<param>', methods=["GET","OPTIONS"])
def reset(param):
    if param == '114514':
        r = redis.Redis(host='localhost', port=6379, db=0)
        r.incrby('mapTextStudy:numOfParticipant', 0)
        return("success!")
    else:
        return("You bad bad boy!!")

#@app.route('/testArray', methods=["GET","OPTIONS"])
#def testArray():
#    r = redis.Redis(host='localhost', port=6379, db=0)
#    arr = r.lrange('mapTextStudy:group1', 0, 5)
#    lpop = r.lpop('mapTextStudy:group1').decode('UTF-8')
#    r.rpush('mapTextStudy:group1', lpop)
#    newarr = r.lrange('mapTextStudy:group1', 0, 5)
#    print(arr)
#    print(lpop)
#    print(newarr)
#    return 'success'

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=int(os.environ.get('PORT', 8622)))
