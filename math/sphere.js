/*
 * An object type representing an implicit sphere.
 *
 * @param center A Vector3 object representing the position of the center of the sphere
 * @param radius A Number representing the radius of the sphere.
 */

var Sphere = function(center, radius) {

  // Sanity checks (your modification should be below this where indicated)
  if (!(this instanceof Sphere)) {
    console.error("Sphere constructor must be called with the new operator");
  }


  this.center = center;
  this.radius = radius;

  if(center  ===  undefined){
  this.center = new Vector3(0, 0, 0);
  }

  if(radius === undefined){
    this.radius = 1;
  }



  // todo - make sure this.center and this.radius are replaced with default values if and only if they
  // are invalid or undefined (i.e. center should be of type Vector3 & radius should be a Number)
  // - the default center should be the zero vector
  // - the default radius should be 1
  // YOUR CODE HERE

  // Sanity checks (your modification should be above this)
  if (!(this.center instanceof Vector3)) {
    console.error("The sphere center must be a Vector3");
  }

  if ((typeof(this.radius) != 'number')) {
    console.error("The radius must be a Number");
  }

};



Sphere.prototype = {

  //-----------------------------------------------------------------------------
  raycast: function(r1) {
    // todo - determine whether the ray intersects this sphere and if so, where
    var result = {
      hit: null,      // should be of type Boolean
      point: null,    // should be of type Vector3
      normal: null,   // should be of type Vector3
      distance: null, // should be of type Number (scalar)
    };

    if(this.validPoint === true){
      result.hit = 1;
    }else{
      result.hit = 0;
    }

    var r1 = new Ray(new Vector3(0, 0, -10), new Vector3(0, 0, 1));
    var s3 = new Sphere(new Vector3(), 1);
// var numerator = this.normal.dot(this.validPoint) = this.normal.dot(ray.origin);
// var denominator = this.normal.dot(ray.direction);

//p = orgin + direction
// sphere(center,radius)
//ray(orgin,direction)


    // Recommended steps
    // ------------------
    // 0. (optional) watch the video showing the complete implementation of plane.js
    //    You may find it useful to see a different piece of geometry coded.

    // 1. review slides/book math

    // 2. identity the vectors needed to solve for the coefficients in the quadratic equation

    // 3. calculate the discriminant

    // 4. use the discriminant to determine if further computation is necessary
    //    if (determinant...) { ... } else { ... }

    // 5. return the following object literal "result" based on whether the intersection
    //    is valid (i.e. the intersection is in front of the ray and the ray is not inside
    //    the sphere)
    //    case 1: no VALID intersections
    //      var result = { hit: false, point: null }
    //    case 2: 1 or more intersections
    //      var result = {
    //        hit: true,
    //        point: 'a Vector3 containing the closest VALID intersection',
    //        normal: 'a vector3 containing a unit length normal at the intersection point',
    //        distance: 'a scalar containing the intersection distance from the ray origin'
    //      }

    // An object created from a literal that we will return as our result
    // Replace the null values in the properties below with the right values


    return result;
  }
}

// EOF 00100001-1
