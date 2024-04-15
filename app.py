from flask import Flask, render_template, send_from_directory, jsonify, request
import os, logging, time, random

# Initialize Flask application
app = Flask(__name__, static_folder='frontend/build')


# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger('flask')

# Show this route first since it is more specific, catch everything else with index routing
#@app.route('/static/<path:path>')
#def serve_static(path):
#    absolute_path = os.path.join(app.static_folder, path)
#    print("Serving static file from:", absolute_path)
#    return send_from_directory(os.path.join(app.static_folder, 'static'), path)

@app.route('/get_progress_tokens')
def get_items():
    # Generate or fetch the items data
    tokens = ['Agriculture', 'Architecture', 'Economy', 'Law', 'Masonry', 'Mathematics', 'Philosophy', 'Strategy', 'Theology', 'Urbanism']
    # Shuffle the array randomly
    random.shuffle(tokens)
    # Return 5 items chosen for the game
    selected_items = tokens[:5]
    return jsonify({'tokens': selected_items})


# Route for serving static files
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(os.path.join(app.static_folder, 'static'), filename)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start_game')
def start_game():
    # Logic to start the game (record start time)
    # You may want to store the start time in session or database
    # For simplicity, let's assume storing in a global variable
    
    #global start_time
    #start_time = time.time()

    # Players
    players = []
    
    #data = request.get_json()
    #players.append(data.get('player1name'))
    #players.append(data.get('player2name'))

    #random.shuffle(players)
    return jsonify({'players': players})
    #return render_template('index.html', players = players)

# End game route
@app.route('/end_game', methods=['POST'])
def end_game():
    print("end game")
    # Logic to end the game (calculate time used)
    # You may want to store the end time in session or database
    # For simplicity, let's assume end time is current time
    end_time = time.time()
    time_used = end_time - start_time
    return jsonify({'status': 'success', 'time_used': time_used})







if __name__ == '__main__':
    app.run(debug=True)
