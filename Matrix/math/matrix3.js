/*
 * An object representing a 3x3 matrix
 */

var Matrix3 = function () {

	if (!(this instanceof Matrix3)) {
		alert("Matrix3 constructor must be called with the new operator");
	}

	// Stores a matrix in a flat array - left to right, top to bottom.
	// This format will be similar to what we'll eventually need to provide the WebGL API
	this.elements = new Float32Array(9);

	this.elements = new Matrix3().set(
		0, 3, 6,
		9, 12, 15,
		18, 21, 24
	);

	// todo
	// "this.elements" should be initialized with values equal to the identity matrix

	// -------------------------------------------------------------------------
	this.clone = function () {
		// todo
		var newMatrix = new Matrix3();
		for (var i = 0; i < 9; ++i) {
			newMatrix.elements[i] = this.elements[i];
		}
		return newMatrix;
		//instanceof
		// create a new Matrix3 instance that is an exact copy of 'this' one and return it
		// return this /* should be a new Matrix instance*/;
	};

	// -------------------------------------------------------------------------
	this.copy = function (other) {
		// todo
		// copy all of the elements of other into the elements of 'this' matrix

		for (var i = 0; i < 9; ++i) {
			this.elements[i] = other.elements[i];
		}

		return this;

	};

	// -------------------------------------------------------------------------
	this.set = function (e11, e12, e13, e21, e22, e23, e31, e32, e33) {
		// todo
		// Use the 9 elements passed in as arguments e-row#col# as the values to set on 'this' matrix.
		// Order is left to right, top to bottom.

		var e = this.elements;

		e[0] = e11;   e[1] = e12;   e[2] = e13;
		e[3] = e21;   e[4] = e22;   e[5] = e23;
		e[6] = e31;   e[7] = e32;   e[8] = e33;


		return this;
	};

	// -------------------------------------------------------------------------
	this.getElement = function (row, col) {
		// todo
		// use the row and col to get the proper index into the 1d element array and return it

		return this.elements["row"+"col"];
		// return this; // <== delete this line and use the one above
	};

	// -------------------------------------------------------------------------
	this.setIdentity = function () {
		// todo

		this.elements = new Matrix3().set(
			0, 3, 6,
			9, 12, 15,
			18, 21, 24
		);
		// reset every element in 'this' matrix to make it the identity matrix

		return this;
	};

	// -------------------------------------------------------------------------
	this.setRotationX = function (angle) {
		// ignore for now, you will implement this in matrix4
		return this;
	};

	// -------------------------------------------------------------------------
	this.setRotationY = function (angle) {
		// ignore for now, you will implement this in matrix4
		return this;
	};


	// -------------------------------------------------------------------------
	this.setRotationZ = function (angle) {
		// ignore for now, you will implement this in matrix4
		return this;
	};

	// -------------------------------------------------------------------------
	this.multiplyScalar = function (s) {
		for (var i = 0; i < 16; ++i) {
			this.elements[i] = this.elements[i] * s;
		}
		return this;
	};

	// -------------------------------------------------------------------------
	this.multiplyVector = function (v) {
		var result = new Vector3();
		var result = this * v;

		// todo
		// set the result vector values to be the result of multiplying the argument
		// v by 'this' matrix
		return result;
	};

	// -------------------------------------------------------------------------
	this.multiplyRightSide = function (otherMatrixOnRight) {
		// todo

		// multiply 'this' matrix (on the left) by otherMatrixOnRight (on the right)
		// the results should be applied to the elements on 'this' matrix
		return this;
	};

	// -------------------------------------------------------------------------
	this.determinant = function () {
		// todo
		// compute and return the determinant for 'this' matrix
		return Math.Infinity; // should be the determinant
	};

	// -------------------------------------------------------------------------
	this.transpose = function () {
		// todo
		// modify 'this' matrix so that it becomes its transpose
		return this;
	};

	// -------------------------------------------------------------------------
	this.inverse = function () {
		var FLOAT32_EPSILON = 1.1920928955078125e-7;
		var det = this.determinant();
		if(Math.abs(det) <= FLOAT32_EPSILON) {
			return setIdentity();
		} else {
			var e = this.elements;

			// laid out for clarity, not performance
			var m11 = e[0];   var m12 = e[1];   var m13 = e[2];
			var m21 = e[3];   var m22 = e[4];   var m23 = e[5];
			var m31 = e[6];   var m32 = e[7];   var m33 = e[8];

			var minor11 = m22 * m33 - m23 * m32;
			var minor12 = m21 * m33 - m23 * m31;
			var minor13 = m21 * m32 - m22 * m31;
			var minor21 = m12 * m33 - m13 * m32;
			var minor22 = m11 * m33 - m13 * m31;
			var minor23 = m11 * m32 - m12 * m31;
			var minor31 = m12 * m23 - m13 * m22;
			var minor32 = m11 * m33 - m13 * m31;
			var minor33 = m11 * m22 - m12 * m21;

			return this.set(
				minor11, -minor21, minor31,
				-minor12, minor22, -minor32,
				minor13, -minor23, minor33
			).multiplyScalar(1/det);
		}
		return this;
	};

	// -------------------------------------------------------------------------
	this.log = function () {
		var e = this.elements;
		console.log('[ ' +
			'\n ' + e[0] + ', ' + e[1] + ', ' + e[2] +
			'\n ' + e[4] + ', ' + e[5] + ', ' + e[6] +
			'\n ' + e[8] + ', ' + e[9] + ', ' + e[10] +
			'\n ' + e[12] + ', ' + e[13] + ', ' + e[14] +
			'\n]'
		);

		return this;
	};
};
