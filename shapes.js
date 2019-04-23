/*
 * Matthew Coulombe
 * CSC 337
 * Homework 11
 * shpaes.js
 * This program creates the javascript for shapes.html. It can add shapes to the page
 * using specific colors. It can randomize shapes currently on the page, as well as clear
 * the page of any shapes. The user can also save what they made and get a random creation
 * that has been previously saved. 
 */

"use strict";

(function() {

	let count = 0; // Counts the number of shapes on the page that have been added
	let zCount = 1; // Changes the Z index as shapes are clicked on. 

	/** When the page loads, add default values for the text values **/
	window.onload = function() {
		document.getElementById("squareBox").defaultValue = 0; // Adds default value
		document.getElementById("circleBox").defaultValue = 0; // Adds default value
		document.getElementById("triangleBox").defaultValue = 0; // Adds default value
		document.getElementById("rectangleBox").defaultValue = 0; // Adds default value
		document.getElementById("trapezoidBox").defaultValue = 0; // Adds default value
		getShapes(); // DO I NEED TO CALL THIS FUNCTION? Gets shapes
		let submit = document.getElementById("submit"); // Gets the add shapes button
		submit.onclick = submitShapes; // Sets function submitShapes to the submit button
		let random = document.getElementById("random"); // Gets the random button
		random.onclick = randomShapes; // Sets function randomShapes to the random button
		let clear = document.getElementById("clear"); // Gets the clear button
		clear.onclick = clearShapes; // Sets function clearShapes to the clear button
		let save = document.getElementById("save"); // Gets the Save creation button
		save.onclick = saveCreation; // Sets the function saveCreation to the save button
		let getRandom = document.getElementById("getRandom");// Gets the get random creation button

		 // Sets the function getRandomCreation to the getRandom button
		getRandom.onclick = getRandomCreation;
		let select = document.getElementById("color"); // Gets the select button
		select.onclick = changeBackground;//Sets the function changeBackground to the select button
	};

	/** When a color is selected, changes the background color based on the 
	selection from the color box. **/
	function changeBackground(){
		let colorBox = document.getElementById("color"); // Gets the color box

		// Gets the value of the color box
		let color = colorBox.options[colorBox.selectedIndex].value;

		// Gets each display shape
		let s = document.getElementById("s"); // Square
		let c = document.getElementById("c"); // Circle
		let t = document.getElementById("t"); // Triangle
		let r = document.getElementById("r"); // Rectangle
		let tr = document.getElementById("tr"); // Trapezoid

		if(color == "#0e0e0e"){ // If the color is black
			colorBox.style.color = "white"; // Change the font color to white to see the font
		}
		else{ // Any other color, set the font color to black 
			colorBox.style.color = "black"; 
		}

		colorBox.style.backgroundColor = color; //Change the background color to the selected color

		// Change the bottom border for the triangle and trapezoid to change the color
		t.style.borderBottomColor = color;
		tr.style.borderBottomColor = color;

		// Change the background color for the square, circle, and rectangle to change the color
		s.style.backgroundColor = color; 
		c.style.backgroundColor = color;
		r.style.backgroundColor = color;		
	}

	/** When the clear button is clicked, clears the page of any shapes **/
	function clearShapes(){
		// Hides the message div that states whether a creation was successfully saved
		document.getElementById("message").style.visibility = "hidden";

		let space = document.getElementById("space"); // Gets the space 
		space.innerHTML = ""; // Clears the space
	}

	/** When the user submits shapes, gets the amount specified and adds them to the page **/
	function getShapes(){
		// Gets the values in each box for each shape
		let square = document.getElementById("squareBox").value;
		let circle = document.getElementById("circleBox").value;
		let triangle = document.getElementById("triangleBox").value;
		let rectangle = document.getElementById("rectangleBox").value;
		let trapezoid = document.getElementById("trapezoidBox").value;

		let space = document.getElementById("space"); // Gets the space
		
		// For the number specified, call a function to add the square and increase the count
		for(let i = 0; i < square; i++){
			addSquare(space); // adds a square to the page
			count++; // Increases the count
		}

		// For the number specified, call a function to add the circle and increase the count
		for(let i = 0; i < circle; i++){
			addCircle(space); // adds a circle to the page
			count++; // Increases the count
		}

		// For the number specified, call a function to add the triangle and increase the count
		for(let i = 0; i < triangle; i++){
			addTriangle(space); // adds a triangle to the page
			count++; // Increases the count
		}

		// For the number specified, call a function to add the rectangle and increase the count
		for(let i = 0; i < rectangle; i++){
			addRectangle(space); // adds a rectangle to the page
			count++; // Increases the count
		}

		// For the number specified, call a function to add the trapezoid and increase the count
		for(let i = 0; i < trapezoid; i++){
			addTrapezoid(space); // adds a trapezoid to the page
			count++; // Increases the count
		}

		// Create move for each of the new shapes
		createMove(square, circle, triangle, rectangle, trapezoid);
	}

	/** Gets all the shapes on the page and calls newShapes for each shape. **/
	function createMove(square, circle, triangle, rectangle, trapezoid){
		let space = document.getElementById("space"); // Gets the space
		
		// Gets all shapes in the space for each shape
		let squares = document.querySelectorAll("#space .square");
		let circles = document.querySelectorAll("#space .circle");
		let triangles = document.querySelectorAll("#space .triangle");
		let rectangles = document.querySelectorAll("#space .rectangle");
		let trapezoids = document.querySelectorAll("#space .trapezoid");
	
		// Call newShapes and pass in the space, total shapes for each shape, 
		// the new number of each shape, and an ID for each shape
		newShapes(space, squares, square, "s"); 
		newShapes(space, circles, circle, "c");
		newShapes(space, triangles, triangle, "tri");
		newShapes(space, rectangles, rectangle, "r");
		newShapes(space, trapezoids, trapezoid, "trap");	
	}

	/** For each set of new shapes, adds the selected color and a random location **/
	function newShapes(space, shapes, shapeNum, id){
		for(let i = shapes.length-1; i >= shapes.length - shapeNum; i--){ // For each new shape
			let shape = shapes[i]; // Get the specific shape
			addColor(shape,id); // Adds the color for the specific shape
			addLocation(space, shape); // Adds the location for the specific shape
		}
	}

	/** Adds a color to the shape dependent on the ID **/
	function addColor(shape, id){
		let colorBox = document.getElementById("color"); // Gets the color box

		// Gets the selected color's value
		let color = colorBox.options[colorBox.selectedIndex].value;

		if(id=="tri" || id=="trap"){ // For Triangles and Trapezoids
			// Change the border bottom color to the selected color
			shape.style.borderBottomColor = color;
		}

		else{
			shape.style.backgroundColor = color;//Change the background color to the selected color
		}

	}

	/** When the random button is pressed, gets all the shapes on the 
	page and add random locations **/
	function randomMove(){
		let space = document.getElementById("space"); // Gets the space

		// Gets all the shapes on the page
		let squares = document.querySelectorAll("#space .square");
		let circles = document.querySelectorAll("#space .circle");
		let triangles = document.querySelectorAll("#space .triangle");
		let rectangles = document.querySelectorAll("#space .rectangle");
		let trapezoids = document.querySelectorAll("#space .trapezoid");

		// Adds styles for each set of shapes
		addStyle(space, squares);
		addStyle(space, circles);
		addStyle(space, triangles);
		addStyle(space, rectangles);
		addStyle(space, trapezoids);
	}

	/** For each set of shapes, adds a random location **/
	function addStyle(space, shapes){
		for(let i = 0; i < shapes.length; i++){ 
			let shape = shapes[i]; // gets the specific shape
			addLocation(space, shape); // add the random location for each shape
		}
	}

	/** Sets a random top and left location for the shape **/
	function addLocation(space, shape){
		let spaceHeight = parseInt(window.getComputedStyle(space).height); //Get the space's height
		let spaceWidth = parseInt(window.getComputedStyle(space).width); // Get the space's width
		let shapeHeight = parseInt(window.getComputedStyle(shape).height); //Get the shape's height
		let shapeWidth =  parseInt(window.getComputedStyle(shape).width); // Get the shape's width

		// Sets a random top and left location in the space for the shape
		shape.style.top = Math.floor(Math.random() * (spaceHeight - shapeHeight-50)) + "px";
		shape.style.left = Math.floor(Math.random() * (spaceWidth - shapeWidth-50)) + "px";
	}

	/** Adds a square to the page **/
	function addSquare(space){
		let square = document.createElement("div"); // Create the element
		square.className = "square"; // Set the class
		square.onmousedown = clickDown; // Calls clickDown when clicked
		square.onmouseup = clickUp; // Calls clickUp when clicked
		square.onmousemove = clickMove; // Calls clickMove when moved inside
		square.prevX = 0; // Assigns previous X
		square.prevY = 0; // Assigns previous Y
		square.down = false; // Assigns the .down value to false

		// adds an event  listener to clickUp if the mouse leaves the div while clicked down
		square.addEventListener('mouseleave', clickUp); 

		// sets the zIndex so the new shape will appear on top of other shapes
		square.style.zIndex = count + zCount;
		space.appendChild(square); // appends the shape to the space
	}

	/** Adds a circle to the page **/
	function addCircle(space){
		let circle = document.createElement("div"); // Create the element
		circle.className = "circle"; // Set the class
		circle.onmousedown = clickDown; // Calls clickDown when clicked
		circle.onmouseup = clickUp; // Calls clickUp when clicked
		circle.onmousemove = clickMove; // Calls clickMove when moved inside
		circle.prevX = 0; // Assigns previous X
		circle.prevY = 0; // Assigns previous Y
		circle.down = false; // Assigns the .down value to false

		// adds an event  listener to clickUp if the mouse leaves the div while clicked down
		circle.addEventListener('mouseleave', clickUp);

		// sets the zIndex so the new shape will appear on top of other shapes
		circle.style.zIndex = count + zCount;
		space.appendChild(circle); // appends the shape to the space
	}

	/** Adds a triangle to the page **/
	function addTriangle(space){
		let triangle = document.createElement("div"); // Create the element
		triangle.className = "triangle"; // Set the class
		triangle.onmousedown = clickDown; // Calls clickDown when clicked
		triangle.onmouseup = clickUp; // Calls clickUp when clicked
		triangle.onmousemove = clickMove; // Calls clickMove when moved inside
		triangle.prevX = 0; // Assigns previous X
		triangle.prevY = 0; // Assigns previous Y
		triangle.down = false; // Assigns the .down value to false

		// adds an event  listener to clickUp if the mouse leaves the div while clicked down
		triangle.addEventListener('mouseleave', clickUp); 

		// sets the zIndex so the new shape will appear on top of other shapes
		triangle.style.zIndex = count + zCount;
		space.appendChild(triangle); // appends the shape to the space
	}

	/** Adds a rectangle to the page **/
	function addRectangle(space){
		let rect = document.createElement("div"); // Create the element
		rect.className = "rectangle"; // Set the class
		rect.onmousedown = clickDown; // Calls clickDown when clicked
		rect.onmouseup = clickUp; // Calls clickUp when clicked
		rect.onmousemove = clickMove; // Calls clickMove when moved inside
		rect.prevX = 0; // Assigns previous X
		rect.prevY = 0; // Assigns previous Y
		rect.down = false; // Assigns the .down value to false

		// adds an event  listener to clickUp if the mouse leaves the div while clicked down
		rect.addEventListener('mouseleave', clickUp);

		// sets the zIndex so the new shape will appear on top of other shapes
		rect.style.zIndex = count + zCount;
		space.appendChild(rect); // appends the shape to the space
	}

	/** Adds a trapezoid to the page **/
	function addTrapezoid(space){
		let trap = document.createElement("div"); // Create the element
		trap.className = "trapezoid"; // Set the class
		trap.onmousedown = clickDown; // Calls clickDown when clicked
		trap.onmouseup = clickUp; // Calls clickUp when clicked
		trap.onmousemove = clickMove; // Calls clickMove when moved inside
		trap.prevX = 0; // Assigns previous X
		trap.prevY = 0; // Assigns previous Y
		trap.down = false; // Assigns the .down value to false

		// adds an event  listener to clickUp if the mouse leaves the div while clicked down
		trap.addEventListener('mouseleave', clickUp);

		// sets the zIndex so the new shape will appear on top of other shapes
		trap.style.zIndex = count + zCount;
		space.appendChild(trap); // appends the shape to the space
	}

	/** When a shape is clicked **/
	function clickDown(event){
		this.down = true; // Set its down value to true
		this.prevX = event.clientX; // Set its previous X 
		this.prevY = event.clientY; // Set its previous Y
		zCount += 1; // Increase the zCount
		this.style.zIndex = count + zCount; // Increase the zIndex for the shape
	}

	/** When the shape is unclicked **/
	function clickUp(){
		this.down = false; // Sets its down value to false
	}

	/** When the mouse is moved inside the shape **/
	function clickMove(event){
		if(this.down) { // If the shape has been clicked
			let dx = event.clientX - this.prevX; // Get the difference in x value 
			let dy = event.clientY - this.prevY; // Get the difference in y value
			this.prevX = event.clientX; // Set the previous x value
			this.prevY = event.clientY; // Set the previous y value

			// Sets the new top location to move
			this.style.top = parseInt(this.style.top) + dy + "px";

			// Sets the new left location to move
			this.style.left = parseInt(this.style.left) + dx + "px";
		}
	}

	/** When the submit shapes is clicked, hide the message visibility and then getShapes **/
	function submitShapes(){
		// Hide the message visibility
		document.getElementById("message").style.visibility = "hidden";
		getShapes(); // gets the Shapes
	}

	/** When the random shapes button is clicked, hide the message visibility and then call 
	randomMove **/
	function randomShapes(){
		// Hide the message visibility
		document.getElementById("message").style.visibility = "hidden";
		randomMove(); // randomly moves shapes on the page
	}

	/** When the save creation button is clicked, save the creation. 
	If there are no shapes, an error message will display to the user. **/
	function saveCreation(){
		let space = document.getElementById("space").innerHTML; // Gets the space
		if(space == ""){ // If the space is empty
			// Make the message visible
			document.getElementById("message").style.visibility = "visible";

			// Put an error message on the page
			document.getElementById("message").innerHTML = "Cannot Save an Empty Canvas"; 

			// Change the class name to display a red background
			document.getElementById("message").className = "red";
		}
		else{ // If the space has shapes, post the creation
			const message = {space: space
				}; // Gets the space with all the shapes
			const fetchOptions = { // Sends the post with the name and comment
				method : 'POST',
				headers : {
					'Accept': 'application/json',
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify(message) // Send the message
				};

			let url = "http://shape1.herokuapp.com:"+process.env.port; // Call the host for the post
			fetch(url, fetchOptions)
				.then(checkStatus)
				.then(function(responseText) {

					// Adds the response text to the message
					document.getElementById("message").innerHTML = responseText;

					// Makes the message visible
					document.getElementById("message").style.visibility = "visible";

					// Changes the class to set a green background
					document.getElementById("message").className = "green";

				})
				.catch(function(error) { // Catch the error
					console.log(error);
				});
		}
	}

	/** When the get random creation button is clicked, gets a random creation saved in 
	the file creation.txt **/
	function getRandomCreation(){
		// Changes the visibility of the message to hidden
		document.getElementById("message").style.visibility = "hidden"; 
		let url = "http://shape1.herokuapp.com:+"process.env.PORT; // Calls the server for info 
		fetch(url) 
			.then(checkStatus) // Checks to see if the user inputed a valid state
			.then(function(responseText) {
				let json = JSON.parse(responseText); // Convert the server data into JSON

				// Get a random number
				let randomNum = Math.floor(Math.random()*(json.creations.length));

				// Put the shapes on the page of a random creation
				document.getElementById("space").innerHTML = json.creations[randomNum];
				addMove(); // calls add move to make the shapes from the random creation moveable
			})
			.catch(function(error) { // Catch the error
				console.log(error);
			});
	}

	/** Gets the shapes on the page and makes them clickable **/
	function addMove(){
		let shapes = document.querySelectorAll("#space > div"); // Gets all the shapes
		for(let i = 0; i < shapes.length; i++){ // For each shape
			shapes[i].onmousedown = clickDown; // Calls clickDown when the shape is clicked
			shapes[i].onmouseup = clickUp; // Calls clickUp when the shape is unclicked
			shapes[i].onmousemove = clickMove; // Calls clickMove when the shape is moved
			shapes[i].prevX = 0; // Sets the previous X
			shapes[i].prevY = 0; // Sets the previous Y
			shapes[i].down = false; // Sets the down value to false

			// adds an event  listener to clickUp if the mouse leaves the div while clicked down
			shapes[i].addEventListener('mouseleave', clickUp);
		}
	}

	/** Checks to make sure there is a valid response **/
	function checkStatus(response) {  
        if (response.status >= 200 && response.status < 300) { // If a valid response 
            return response.text();
        } 
        else if(response.status == 404){ // If the URL is not found
        	return Promise.reject(new Error(response.status+":"+response.statusText));
        }
        else {  // If there is an error
        	document.getElementById("message").style.visibility = "visible";
        	document.getElementById("message").className = "green";
        	document.getElementById("message").innerHTML = "Creation could not be saved"
            return Promise.reject(new Error(response.status+":"+response.statusText)); 
        } 
    }

})();
