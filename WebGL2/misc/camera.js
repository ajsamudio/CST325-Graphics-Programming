function Camera(input) {
    // The following two parameters will be used to automatically create the cameraWorldMatrix in this.update()
    this.cameraYaw = 0;
    this.cameraPosition = new Vector3();

    this.cameraWorldMatrix = new  Matrix4();

    // -------------------------------------------------------------------------
    this.getViewMatrix = function() {
        return this.cameraWorldMatrix.clone().inverse();
    }

    // -------------------------------------------------------------------------
    this.getForward = function() {
        // todo #6 - pull out the forward direction from the world matrix and return as a vector
        //         - recall that the camera looks in the "backwards" direction


	//  var xAxis = this.cameraWorldMatrix.clone().getElement(0,6);
    //     var yAxis = this.cameraWorldMatrix.clone().getElement(1,6);
    //     var zAxis = this.cameraWorldMatrix.clone().getElement(2,6);

		//  var xAxis = this.cameraWorldMatrix.clone().getElement(0,5);
        // var yAxis = this.cameraWorldMatrix.clone().getElement(1,5);
        // var zAxis = this.cameraWorldMatrix.clone().getElement(2,5);

		    var xAxis = this.cameraWorldMatrix.clone().getElement(0,3);
        var yAxis = this.cameraWorldMatrix.clone().getElement(1,3);
        var zAxis = this.cameraWorldMatrix.clone().getElement(3,3);
        return new Vector3(xAxis,yAxis,zAxis);
    }
    // -------------------------------------------------------------------------
    this.update = function(dt) {
        var currentForward = this.getForward();

        if (input.up) {
            // todo #7 - move the camera position a little bit in its forward direction
             this.cameraPosition.subtract(currentForward);
        }

        if (input.down) {
            // todo #7 - move the camera position a little bit in its backward direction
            this.cameraPosition.add(currentForward);

        }

        if (input.left) {
            // todo #8 - add a little bit to the current camera yaw
            this.cameraYaw+=0.6;


        }

        if (input.right) {
            // todo #8 - subtract a little bit from the current camera yaw
            this.cameraYaw-=0.6;


        }

        // todo #7 - create the cameraWorldMatrix from scratch based on this.cameraPosition
        this.cameraWorldMatrix.makeIdentity();
                this.cameraWorldMatrix.makeTranslation(this.cameraPosition);
        // todo #8 - create a rotation matrix based on cameraYaw and apply it to the cameraWorldMatrix
        // (order matters!)
        var rotate = new Matrix4().makeRotationY(this.cameraYaw);
        this.cameraWorldMatrix.multiply(rotate);

    }
}
