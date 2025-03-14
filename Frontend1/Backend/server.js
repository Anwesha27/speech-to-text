import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { AutomaticSpeechRecognition } from "deepinfra";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5175;

app.use(cors());
app.use(express.json());

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// DeepInfra setup
const DEEPINFRA_API_KEY = process.env.DEEPINFRA_API_KEY; // Use environment variable for API key
const MODEL = "openai/whisper-large-v3"; // Specify the DeepInfra model

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

app.post('/transcribe', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No audio file uploaded.');
        }

        const audioFilePath = path.join(__dirname, 'uploads', req.file.filename);

        // Initialize DeepInfra client
        const client = new AutomaticSpeechRecognition(MODEL, DEEPINFRA_API_KEY);

        // Prepare input for DeepInfra API
        const input = {
            audio: audioFilePath,
        };

        // Call DeepInfra API for transcription
        const response = await client.generate(input);

        if (response && response.text) {
            const transcription = response.text;

            // Save transcription to Supabase
            const { data, error } = await supabase
                .from('transcriptions')
                .insert([{ text: transcription }]);

            if (error) {
                console.error('Supabase error:', error);
            } else {
                console.log('Transcription saved to Supabase:', data);
            }

            fs.unlinkSync(audioFilePath); // Delete uploaded file after processing
            res.json({ transcription: transcription });
        } else {
            console.error('DeepInfra API did not return a valid transcription.');
            fs.unlinkSync(audioFilePath);
            res.status(500).json({ error: 'Failed to get transcription from DeepInfra.' });
        }
    } catch (error) {
        console.error('Transcription error:', error);
        res.status(500).json({ error: 'Failed to transcribe audio.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
