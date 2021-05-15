function FlyCamera(input) {
    this.cameraWorldMatrix = new Matrix4();
    this.yawDegrees = 0;
    this.pitchDegrees = 0;
    this.movementPerSecond = 5;
    this.position = new Vector3();

    var lastMouseX = 0;
    var lastMouseY = 0;
    var isDragging = false;

    // -------------------------------------------------------------------------
    this.getViewMatrix = function() {
        return this.cameraWorldMatrix.clone().inverse();
    }

    // -------------------------------------------------------------------------
    this.getRight = function() {
        return new Vector3(
            this.cameraWorldMatrix.elements[0],
            this.cameraWorldMatrix.elements[4],
            this.cameraWorldMatrix.elements[8]
        ).normalize();
    }

    // -------------------------------------------------------------------------
    this.getForward = function() {
        return new Vector3(
            -this.cameraWorldMatrix.elements[2],
            -this.cameraWorldMatrix.elements[6],
            -this.cameraWorldMatrix.elements[10]
        );
    }

    // -------------------------------------------------------------------------
    this.getUp = function() {
        return new Vector3(
            this.cameraWorldMatrix.elements[1],
            this.cameraWorldMatrix.elements[5],
            this.cameraWorldMatrix.elements[9]
        ).normalize();
    }

    // -------------------------------------------------------------------------
    this.update = function(dt, secondsElapsedSinceStart) {
        var yaw = new Matrix4().setRotationY(this.yawDegrees);
        var pitch = new Matrix4().setRotationX(this.pitchDegrees);

        this.cameraWorldMatrix = yaw.clone();
        this.cameraWorldMatrix.multiplyRightSide(pitch);

        var right = this.getRight();
        var up = this.getUp();
        var forward = this.getForward();

        var movementPerFrame = this.movementPerSecond * dt;

        if (input.up || input.w) {
            this.position.add(forward.multiplyScalar(movementPerFrame));
        }

        if (input.down || input.s) {
            this.position.subtract(forward.multiplyScalar(movementPerFrame));
        }

        if (input.left || input.a) {
            this.position.subtract(right.multiplyScalar(movementPerFrame));
        }

        if (input.right || input.d) {
            this.position.add(right.multiplyScalar(movementPerFrame));
        }

        if (input.q) {
            this.position.subtract(up.multiplyScalar(movementPerFrame));
        }

        if (input.e) {
            this.position.add(up.multiplyScalar(movementPerFrame));
        }

        this.cameraWorldMatrix.translate(this.position);
    }

    // -------------------------------------------------------------------------
    document.onmousedown = function(evt) {
        // left click only
        if (evt.buttons == 1) {
            isDragging = true;
            lastMouseX = evt.pageX;
            lastMouseY = evt.pageY;
        }
    }

    // -------------------------------------------------------------------------
    document.onmousemove = function(evt) {
        if (isDragging) {
            this.yawDegrees -= (evt.pageX - lastMouseX) * 0.5;
            this.pitchDegrees -= (evt.pageY - lastMouseY) * 0.5;

            this.pitchDegrees = Math.min(this.pitchDegrees, 85);
            this.pitchDegrees = Math.max(this.pitchDegrees, -85);
            
            console.log(this.pitchDegrees);

            lastMouseX = evt.pageX;
            lastMouseY = evt.pageY;
        }
    }.bind(this)

    // -------------------------------------------------------------------------
    document.onmouseup = function(evt) {
        isDragging = false;
    }
}