const express = require('express');
const Pusher = require('pusher');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pusher = new Pusher({
  appId: '2166363',
  key: 'a4764a812a3a7413bc8e',
  secret: '9eab1fb1aaa70e9598ef',
  cluster: 'us2',
  useTLS: true
});

app.post('/trigger', async (req, res) => {
  try {
    const { event, data } = req.body;
    await pusher.trigger('aoki-sorter', event, data);
    res.json({ ok: true });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (req, res) => res.send('Aoki Sorter Server Running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
