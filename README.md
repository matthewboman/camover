##camover1984

##About

camover1984 is a user-driven app for documenting CCTV using google's map API. check out an
[interactive demo](https://crashspringfield.github.io/camover-demo/#/) where you can get a feel
for the app and placing cameras but won't be able to save anything.

camover1984 is a RESTful API built using a MEAN (MongoDB, Express, AngularJs, and Nodejs) stack.

##Contributing

There are always things that need worked on:

    bot/hack prevention:
        --> If clauses that either limit posts per session or posts within a timeframe?
        --> general injection fricks
    
    spiders:
        ---> Companies have similar sites for rad or nefarious purposes; let's gank their data.
            [Video Surveillance](https://www.videosurveillance.com/communitycam/)
            [Treasure Hunt](https://cctvtreasurehunt.wordpress.com/map/)
            [City of Baltimore](https://data.baltimorecity.gov/Public-Safety/CCTV-Locations/hdyb-27ak)
            [CCTV Map](https://thecctvmap.wordpress.com/)
            
    clustering:
        --> As more cameras get placed, the map is going to look hella messy. Let's make the 
        markers cluster together.
        
    aesthetics
    
    other features or ways to improve?

And if computers aren't your thing but you want to help:

    Submit references and links on surveillance, security culture, etc.
    for the 'About' page to camover1984 (at) google (dot) com.

## Running Locally

Fork, clone, or download. Change into directory. Install dependencies and start app:

    npm install
    bower install
    node server.js || node start

## License

MIT
