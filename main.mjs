import { createClient } from 'redis';
const client = createClient();

// Create Redis client
createClient({
    url: 'redis://alice:foobared@awesome.redis.server:6380'
});

// Catch Redis connect error
client.on('error', (err) => console.log('Redis Client Error', err));


// Connect to client
await client.connect();

// Set key data
await client.json.set('multichat:cNhuxD2vE5v3os11OTt9', '$', {
    "multichat": {
        "twitch": {
            "chatters": {
                "count": 2,
                "broadcaster": [],
                "vips": [],
                "moderators": [
                    "nightbot"
                ],
                "staff": [],
                "admins": [],
                "global_mods": [],
                "viewers": [
                    "emma_the_dilemmaa",
                    "paulaarrigui"
                ],
                "bot_viewers": [
                    "0ax2",
                    "alexisthenexis",
                    "aliengathering",
                    "anna_banana_10",
                    "beardedstrumerwaitingroom",
                    "commanderroot",
                    "dankingaround",
                    "dukan_rex",
                    "elbretweets",
                    "iizzybeth",
                    "sophiafox21",
                    "stygian_styx",
                    "twitchstreamerdiscord",
                    "viewer_of_irl",
                    "warsofthetrekgatestar",
                    "nightbot"
                ]
            }
        }
    }
});

// Set TTL on key
await client.expire('multichat:cNhuxD2vE5v3os11OTt9', 5)

// Lookup key
const results = await client.json.get('multichat:cNhuxD2vE5v3os11OTt9');
console.log(results)

// Create Redis config set for expire events
client.configSet("notify-keyspace-events", "Ex");

// Create sepreate client for event listening
const sub = client.duplicate();
sub.connect();

// Subcribe to expire events
sub.subscribe("__keyevent@0__:expired", async (key) => {
    console.log(key + ' has expired')

// Here you can insert code to pull fresh data from it's source and re-cache in Redis based on the key

// EXAMPLE
// const freshData = await axios.get('https://api.domain.com/multichat?channel=cNhuxD2vE5v3os11OTt9') // Obtain fresh data
// await client.json.set('multichat:cNhuxD2vE5v3os11OTt9', '$', freshData.data) // Store fresh data
// await client.expire('multichat:cNhuxD2vE5v3os11OTt9', 5) // Set TTL for next expire
})