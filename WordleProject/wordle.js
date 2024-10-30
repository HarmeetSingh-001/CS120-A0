window.onload = function() {
    // used to create initial answer
    answerList = createAnswer();
    console.log(answerList[0]);

    // used to track number of guesses
    let guessNum = 1;

    // used to check if the word given is valid, continues if it is, asks again if not
    let valid = true;


    // let the user also use the enter key to submit
    document.getElementById("userGuess").addEventListener("keypress", function(event) {
        if (event.key === "Enter"){
            document.getElementById("submit").click();
        }
    })

    // on clicking submit, get guess and then check which are correct for letters and display to user
    document.getElementById("submit").onclick = async function() {

        // highlight the text box so user can input again quickly
        document.getElementById("userGuess").select();

        // get user input
        let userGuess = (document.getElementById("userGuess").value).toUpperCase();

        // using dictionary to validate real word
        url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + userGuess;
        let result = await fetch(url);
            if (result.status == 404) {
                alert("Please enter a valid 5 letter word.");
                valid = false;
            }
            else {
                valid = true;
            }

        // check if word is 5 letters
        if (userGuess.length != 5 && valid) {
            alert("Please enter a valid 5 letter word.");
        }

        // the guess is valid, split the string into an array and compare to the answer
        else if (valid) {
            // split the guess into an array for easier comparing
            let guessSplit = userGuess.split("");
            displayGuess(guessSplit, guessNum);
            colorGuess(guessSplit, guessNum, answerList[1]);
            answerList[1] = resetAnswer(answerList[0]);
            guessNum++;
        }
    }

    // lets you play another game by simply refreshing the page
    document.getElementById("newGame").onclick = function () {
        location.reload();
    }

    document.getElementById("averageGuess").onclick = function () {
        alert("Your average is: " + Math.ceil(getCookie("guesses")/getCookie("attempts")) + " guesses");
    }
}


// display each character
// {s = userInput, n = the current guess number}
function displayGuess(s, n) {
    // letter position
    let index = 1;

    s.forEach(c => {
        document.getElementById("guess" + n).classList.add("letter" + index);
        document.getElementById("guess" + n).querySelector(".letter" + index).innerHTML = c;
        index++;
    });
}

// color each cell correctly 
// {s = userInput, n = the current guess number, w = answer}
function colorGuess(s,n,w) {
    // index for traversing the answer word
    let charIndex = 0;
    // check to see if all green to let user know they won
    let correct = 0;

    // first check each letter to see if it is already in the correct spot
    s.forEach(c => {
        if (c === w[charIndex]) {
            document.getElementById("guess" + n).querySelector(".letter" + (charIndex + 1)).setAttribute("style", "background-color:#538d4e");
            document.getElementById(c).setAttribute("style", "background-color:#538d4e;");
            w[charIndex] = "";
            correct++;
        }
        charIndex++;
    });
    if (correct == 5) {
        alert("YOU DID IT! The word was " + answerList[0]);
        updateGameState(n, true);
        
    }
    else if (n == 6) {
        alert("You ran out of guesses! The word was " + answerList[0]);
        updateGameState(n, false);
    }

    // set index to 0 for second loop
    charIndex = 0;
    // this loop checks the letters again and sees if they exist in the answer and if they do, update the color
    s.forEach(c => {
        if (w.includes(c) && document.getElementById("guess" + n).querySelector(".letter" + (charIndex + 1)).getAttribute("style") == null){
            document.getElementById("guess" + n).querySelector(".letter" + (charIndex + 1)).setAttribute("style", "background-color:#b59f3b");
            if (document.getElementById(c).getAttribute("style") == null){
                document.getElementById(c).setAttribute("style", "background-color:#b59f3b;");
            }
            w[w.indexOf(c)] = "";
        }
        else {
            if (document.getElementById("guess" + n).querySelector(".letter" + (charIndex + 1)).getAttribute("style") == null){
                document.getElementById("guess" + n).querySelector(".letter" + (charIndex + 1)).setAttribute("style", "background-color:#953c3c");
            }
            if (document.getElementById(c).getAttribute("style") == null) {
                document.getElementById(c).setAttribute("style", "background-color:#953c3c;");
            }
        }
        charIndex++;
    });

    return false;
}

// used to create answer from (api to be implemented)
function createAnswer(){
    let wordList = [
        "About", "Alert", "Argue", "Beach",
        "Above", "Alike", "Arise", "Began",
        "Abuse", "Alive", "Array", "Begin",
        "Actor", "Allow", "Aside", "Begun",
        "Acute", "Alone", "Asset", "Being",
        "Admit", "Along", "Audio", "Below",
        "Adopt", "Alter", "Audit", "Bench",
        "Adult", "Among", "Avoid", "Billy",
        "After", "Anger", "Award", "Birth",
        "Again", "Angle", "Aware", "Black",
        "Agent", "Angry", "Badly", "Blame",
        "Agree", "Apart", "Baker", "Blind",
        "Ahead", "Apple", "Bases", "Block",
        "Alarm", "Apply", "Basic", "Blood",
        "Album", "Arena", "Basis", "Board",
        "Boost", "Buyer", "China", "Cover",
        "Booth", "Cable", "Chose", "Craft",
        "Bound", "Calif", "Civil", "Crash",
        "Brain", "Carry", "Claim", "Cream",
        "Brand", "Catch", "Class", "Crime",
        "Bread", "Cause", "Clean", "Cross",
        "Break", "Chain", "Clear", "Crowd",
        "Breed", "Chair", "Click", "Crown",
        "Brief", "Chart", "Clock", "Curve",
        "Bring", "Chase", "Close", "Cycle",
        "Broad", "Cheap", "Coach", "Daily",
        "Broke", "Check", "Coast", "Dance",
        "Brown", "Chest", "Could", "Dated",
        "Build", "Chief", "Count", "Dealt",
        "Built", "Child", "Court", "Death",
        "Debut", "Entry", "Forth", "Group",
        "Delay", "Equal", "Forty", "Grown",
        "Depth", "Error", "Forum", "Guard",
        "Doing", "Event", "Found", "Guess",
        "Doubt", "Every", "Frame", "Guest",
        "Dozen", "Exact", "Frank", "Guide",
        "Draft", "Exist", "Fraud", "Happy",
        "Drama", "Extra", "Fresh", "Harry",
        "Drawn", "Faith", "Front", "Heart",
        "Dream", "False", "Fruit", "Heavy",
        "Dress", "Fault", "Fully", "Hence",
        "Drill", "Fibre", "Funny", "Night",
        "Drink", "Field", "Giant", "Horse",
        "Drive", "Fifth", "Given", "Hotel",
        "Drove", "Fifty", "Glass", "House",
        "Dying", "Fight", "Globe", "Human",
        "Eager", "Final", "Going", "Ideal",
        "Early", "First", "Grace", "Image",
        "Earth", "Fixed", "Grade", "Index",
        "Eight", "Flash", "Grand", "Inner",
        "Elite", "Fleet", "Grant", "Input",
        "Empty", "Floor", "Grass", "Issue",
        "Enemy", "Fluid", "Great", "Irony",
        "Enjoy", "Focus", "Green", "Juice",
        "Enter", "Force", "Gross", "Joint",
        "Judge", "Metal", "Media", "Newly",
        "Known", "Local", "Might", "Noise",
        "Label", "Logic", "Minor", "North",
        "Large", "Loose", "Minus", "Noted",
        "Laser", "Lower", "Mixed", "Novel",
        "Later", "Lucky", "Model", "Nurse",
        "Laugh", "Lunch", "Money", "Occur",
        "Layer", "Lying", "Month", "Ocean",
        "Learn", "Magic", "Moral", "Offer",
        "Lease", "Major", "Motor", "Often",
        "Least", "Maker", "Mount", "Order",
        "Leave", "March", "Mouse", "Other",
        "Legal", "Music", "Mouth", "Ought",
        "Level", "Match", "Movie", "Paint",
        "Light", "Mayor", "Needs", "Paper",
        "Limit", "Meant", "Never", "Party",
        "Peace", "Power", "Radio", "Round",
        "Panel", "Press", "Raise", "Route",
        "Phase", "Price", "Range", "Royal",
        "Phone", "Pride", "Rapid", "Rural",
        "Photo", "Prime", "Ratio", "Scale",
        "Piece", "Print", "Reach", "Scene",
        "Pilot", "Prior", "Ready", "Scope",
        "Pitch", "Prize", "Refer", "Score",
        "Place", "Proof", "Right", "Sense",
        "Plain", "Proud", "Rival", "Serve",
        "Plane", "Prove", "River", "Seven",
        "Plant", "Queen", "Quick", "Shall",
        "Plate", "Sixth", "Stand", "Shape",
        "Point", "Quiet", "Roman", "Share",
        "Pound", "Quite", "Rough", "Sharp",
        "Sheet", "Spare", "Style", "Times",
        "Shelf", "Speak", "Sugar", "Tired",
        "Shell", "Speed", "Suite", "Title",
        "Shift", "Spend", "Super", "Today",
        "Shirt", "Spent", "Sweet", "Topic",
        "Shock", "Split", "Table", "Total",
        "Shoot", "Spoke", "Taken", "Touch",
        "Short", "Sport", "Taste", "Tough",
        "Shown", "Staff", "Taxes", "Tower",
        "Sight", "Stage", "Teach", "Track",
        "Since", "Stake", "Teeth", "Trade",
        "Sixty", "Start", "Texas", "Treat",
        "Sized", "State", "Thank", "Trend",
        "Skill", "Steam", "Theft", "Trial",
        "Sleep", "Steel", "Their", "Tried",
        "Slide", "Stick", "Theme", "Tries",
        "Small", "Still", "There", "Truck",
        "Smart", "Stock", "These", "Truly",
        "Smile", "Stone", "Thick", "Trust",
        "Smith", "Stood", "Thing", "Truth",
        "Smoke", "Store", "Think", "Twice",
        "Solid", "Storm", "Third", "Under",
        "Solve", "Story", "Those", "Undue",
        "Sorry", "Strip", "Three", "Union",
        "Sound", "Stuck", "Threw", "Unity",
        "South", "Study", "Throw", "Until",
        "Space", "Stuff", "Tight", "Upper",
        "Upset", "Whole", "Waste", "Wound",
        "Urban", "Whose", "Watch", "Write",
        "Usage", "Woman", "Water", "Wrong",
        "Usual", "Train", "Wheel", "Wrote",
        "Valid", "World", "Where", "Yield",
        "Value", "Worry", "Which", "Young",
        "Video", "Worse", "While", "Youth",
        "Virus", "Worst", "White", "Worth",
        "Visit", "Would", "Vital", "Voice"
    ]
    let answer = (wordList[(Math.floor(Math.random() * wordList.length))]).toUpperCase();
    let splitAnswer = answer.split("");
    return [answer, splitAnswer];
    
}

// used to reset the compared list on each guess to ensure reliable feedback
function resetAnswer(w) {
    return w.split("");
}

// updates the game screen to remove the input field and offer new game option and showing average guesses option.
// also updates cookie
// n = guess number, b (boolean) = if they got the word or not
function updateGameState(n, b) {
    // updates the page with end game screen
    document.getElementById("submit").style.display = "none";
    document.getElementById("userGuess").style.display = "none";
    document.getElementById("newGame").style.display = "block";

    if (b){
        setCookie("guesses", getCookie("guesses") + n);
        setCookie("attempts", getCookie("attempts") + 1);
    }
    else {
        setCookie("attempts", getCookie("attempts") + 1);
    }
    console.log(document.cookie);

}

// cookie functions
function setCookie(name, value){
    document.cookie = name + "=" + value + ";";
}

function getCookie(name){
    let cookies = document.cookie.split("; ");
    if (cookies[0].split("=")[0] == name){
        let value = parseInt(cookies[0].split("=")[1]);
        if (value == "") {
            return 0;
        }
        return value;
    }
    else {
        let value = parseInt(cookies[1].split("=")[1]);
        if (value == "") {
            return 0;
        }
        return value;
    }
}
