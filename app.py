from flask import Flask, render_template, send_from_directory, jsonify, request
import os, logging, time, random

# Initialize Flask application
app = Flask(__name__, static_folder='frontend/build')

# Connect to DB
import psycopg2

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger('flask')

@app.route('/get_next_game_id')
def get_next_game_id():
    # Establish connection to the PostgreSQL database
    conn = psycopg2.connect(
        dbname="duel",
        user="postgres",
        password="_Vv-Q!J88*8xGn!Lvb_e",
        host="localhost",
        port="5432"
    )
   
    # Get next gameId from postgre DB
    cur = conn.cursor()
    query = "INSERT INTO game (status) VALUES (%s) RETURNING id;"

    # Data to be inserted into the table
    data = (1,)  # Note the comma at the end to make it a tuple

    # Execute the SQL query
    cur.execute(query, data)

    # Fetch the ID of the just-inserted row
    inserted_id = cur.fetchone()[0]

    # Commit the transaction (to save the changes)
    conn.commit()

    # Close cursor and connection
    cur.close()
    conn.close()

    return jsonify({'inserted_id': inserted_id})


@app.route('/get_progress_tokens')
def get_items():
    # Generate or fetch the items data
    tokens = ['Agriculture', 'Architecture', 'Economy', 'Law', 'Masonry', 'Mathematics', 'Philosophy', 'Strategy', 'Theology', 'Urbanism']
    # Shuffle the array randomly
    random.shuffle(tokens)
    # Return 5 items chosen for the game
    selected_items = tokens[:5]
    return jsonify({'tokens': selected_items})

@app.route('/get_wonders')
def get_wonders():
    # Generate or fetch the items data
    wonders = ['Circus Maximus', 'The Colossus', 'The Pyramids', 'The Statue of Zeus', 'The Mausoleum', 'The Sphinx', 'The Hanging Gardens', 'The Appian Way', 'The Great Lighthouse', 'The Great Library', 'The Temple of Atremis', 'Piraeus']
    # Shuffle the array randomly
    random.shuffle(wonders)
    # Return two sets of 4 items
    set1 = wonders[:4]
    set2 = wonders[5:8]
    wonderSets = [set1, set2]
    return jsonify({'wonders': wonderSets})


# Route for serving static files
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(os.path.join(app.static_folder, 'static'), filename)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
