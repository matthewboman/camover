##camover1984

##About

camover1984 is a user-driven app for documenting CCTV using google's map API. check out an
[interactive demo](https://crashspringfield.github.io/camover-demo/#/) where you can get a feel
for the app and placing cameras but won't be able to save anything.

camover1984 is a RESTful API built using a MEAN (MongoDB, Express, AngularJs, and Nodejs) stack.

##Contributing

There are always things that need worked on:

    Clustering: As more cameras get placed, the map is going to look hella messy. Let's make the markers cluster together.

    OSM: Open Street Map doesn't really integrate with Node, but they
    have a lot of useful data. It'd be good to at least get what camera
    info they have.
    spiders:

## Running Locally

Fork, clone, or download. Change into directory. Install dependencies and start app:

    git clone https://github.com/crashspringfield/camover.git
    npm install
    node server || npm start

## License

MIT
