(function(){
    
    glUtils.SL.init({callback:function() { main(); }});
    
    // var nama = 0;

    function main(){
        
        var canvas = document.getElementById("canvas");
        var gl = glUtils.checkWebGL(canvas);
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
        var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
        var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
        var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
        var program = glUtils.createProgram(gl, vertexShader2, fragmentShader2);
        // var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);
        gl.useProgram(program);

        function gambarCube(){
            var vertices = [];
            var cubePoints = [
                [ -0.8, -0.8,  0.8],
                [ -0.8,  0.8,  0.8],
                [  0.8,  0.8,  0.8],
                [  0.8, -0.8,  0.8],
                [ -0.8, -0.8, -0.8],
                [ -0.8,  0.8, -0.8],
                [  0.8,  0.8, -0.8],
                [  0.8, -0.8, -0.8]
            ];

            var cubeColors = [
                [],
                [1.0, 0.0, 0.0],
                [0.0, 1.0, 0.0],
                [0.0, 0.0, 1.0],
                [1.0, 1.0, 1.0],
                [1.0, 0.5, 0.0],
                [1.0, 1.0, 0.0],
                []
            ];

            var cubeNormals = [
                [],
                [0.0, 0.0, 1.0],
                [1.0, 0.0, 0.0],
                [0.0, -1.0, 0.0],
                [0.0, 0.0, -1.0],
                [-1.0, 0.0, 0.0],
                [0.0, 1.0, 0.0],
                []
            ];

            function quad(a, b, c, d){
                var indices = [a, b, c, a, c, d];
                for(var i =0; i<indices.length;i++){
                    for(var j =0; j<3; j++){
                        vertices.push(cubePoints[indices[i]][j]);
                    }
                    for(var j =0; j < 3;j++){
                        vertices.push(cubeColors[a][j]);
                    }
                    for(var j = 0; j < 3; j++){
                        vertices.push(cubeNormals[a][j]);
                    }
                    switch(indices[i]){
                        case a:
                            vertices.push((a-2)*0.125);
                            vertices.push(0.0);
                            break;
                        case b:
                            vertices.push((a-2)*0.125);
                            vertices.push(1.0);
                            break;
                        case c:
                            vertices.push((a-1)*0.125);
                            vertices.push(1.0);
                            break;
                        case d:
                            vertices.push((a-1)*0.125);
                            vertices.push(0.0);
                            break;
                        default:
                            break;
                    }
                }
            }
            
            // quad(1, 0, 3, 2);
            quad(2, 3, 7, 6);
            quad(3, 0, 4, 7);
            quad(4, 5, 6, 7);
            quad(5, 4, 0, 1);
            quad(6, 5, 1, 2);

            console.log(vertices.length);
            console.log(vertices);

            var vertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

            var vPosition = gl.getAttribLocation(program, 'vCubePosition');
            // var vColor = gl.getAttribLocation(program, 'vColor');
            var vNormal = gl.getAttribLocation(program, 'vNormal');
            var vTexCoord = gl.getAttribLocation(program, 'vTexCoord');
    
            gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, gl.FALSE, 11*Float32Array.BYTES_PER_ELEMENT, 0);
            // gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 9*Float32Array.BYTES_PER_ELEMENT, 3*Float32Array.BYTES_PER_ELEMENT);
            gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 6 * Float32Array.BYTES_PER_ELEMENT);
            gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE, 11 * Float32Array.BYTES_PER_ELEMENT, 9 * Float32Array.BYTES_PER_ELEMENT);
    
            gl.enableVertexAttribArray(vPosition);
            // gl.enableVertexAttribArray(vColor);
            gl.enableVertexAttribArray(vNormal);
            gl.enableVertexAttribArray(vTexCoord);

            var n = vertices.length/11;

            return n;

        }

        function gambarNama(){
            var name = [
                0.4, 0.0, 0.4, 0.3, 0.3, 0.0,
                0.4, 0.3, 0.3, 0.3, 0.3, 0.0,
                0.3, 0.3, 0.3, 0.25, 0.0, 0.2,
                0.0, 0.2, 0.0, 0.15, 0.3, 0.25,
                0.0, 0.2, 0.0, 0.15, -0.3, 0.3,
                -0.3, 0.3, -0.3, 0.25, 0.0, 0.15,
                -0.3, 0.3, -0.4, 0.3, -0.3, 0.0,
                -0.3, 0.0, -0.4, 0.0, -0.4, 0.3
            ];
            var nameBuf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, nameBuf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(name), gl.STATIC_DRAW);
            var vPosition = gl.getAttribLocation(program, 'vPosition');
            gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,2 * Float32Array.BYTES_PER_ELEMENT,0);
            gl.enableVertexAttribArray(vPosition);

            n = name.length/2;
            return n;

        }
        
        var countCube = gambarCube();
        var countName = gambarNama();
       
        
        var thetaUniformLocation = gl.getUniformLocation(program, 'theta');
        var theta = 0;
        var thetaSpeed = 0.0;
        var axis = [true, true, true];
        var x = 0;
        var y = 1;
        var z = 2;

        var mmLoc = gl.getUniformLocation(program, 'modelMatrix');
        var mm = glMatrix.mat4.create();
        glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -2.0]);

        var vmLoc = gl.getUniformLocation(program, 'viewMatrix');
        var vm = glMatrix.mat4.create();
        var pmLoc = gl.getUniformLocation(program, 'projectionMatrix');
        var pm = glMatrix.mat4.create();

        var camera = {x:0.0, y:0.0, z:0.0};
        
        glMatrix.mat4.perspective(pm, glMatrix.glMatrix.toRadian(90), canvas.width/canvas.height, 0.5, 10.0);

        gl.uniformMatrix4fv(pmLoc, false, pm);

        var dcLoc = gl.getUniformLocation(program, 'diffuseColor');
        var dc = glMatrix.vec3.fromValues(1.0, 1.0, 1.0);
        gl.uniform3fv(dcLoc, dc);

        var ddLoc = gl.getUniformLocation(program, 'diffusePosition');
        var dd = glMatrix.vec3.fromValues(1., 2., 1.7);
        gl.uniform3fv(ddLoc, dd);

        var acLoc = gl.getUniformLocation(program, 'ambientColor');
        var ac = glMatrix.vec3.fromValues(0.2, 0.2, 0.2);
        gl.uniform3fv(acLoc, ac);

        var nmLoc = gl.getUniformLocation(program, 'normalMatrix');

        var gambarNamaLocation = gl.getUniformLocation(program, 'nama');
        nama = 1;
        gl.uniform1i(gambarNamaLocation, nama);

        function onKeyDown(event){
            if(event.keyCode == 189) thetaSpeed -= 0.01;
            else if (event.keyCode == 187) thetaSpeed += 0.01;
            else if (event.keyCode == 48) thetaSpeed = 0;
            if(event.keyCode == 88) axis[x] = !axis[x];
            if(event.keyCode == 89) axis[y] = !axis[y];
            if(event.keyCode == 90) axis[z] = !axis[z];
            if(event.keyCode == 38) camera.z -= 0.1;
            else if(event.keyCode == 40) camera.z += 0.1;
            if(event.keyCode == 37) camera.x -= 0.1;
            else if(event.keyCode == 39) camera.x += 0.1;
        }

        document.addEventListener('keydown', onKeyDown);

        var dragging, lastx, lasty;

        function onMouseDown(event){
            var x = event.clientX;
            var y = event.clientY;
            var rect = event.target.getBoundingClientRect();
            if(rect.left <= x && rect.right > x && rect.top <= y && rect.bottom > y){
                dragging = true;
                lastx = x;
                lasty = y;
            }
        }

        function onMouseUp(event){
            dragging = false;
        }

        function onMouseMove(event){
            var x = event.clientX;
            var y = event.clientY;
            if(dragging){
                factor = 10 / canvas.height;
                var dx = factor * (x - lastx);
                var dy = factor * (y - lasty);

                glMatrix.mat4.rotateY(mm, mm, dx);
                glMatrix.mat4.rotateX(mm, mm, dy);
            }
            lastx = x;
            lasty = y;
        }
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);
        // gl.uniform1f(thetaUniformLocation, theta);
        
        // var scaleXUniformLocation = gl.getUniformLocation(program, 'scaleX');
        // var scaleX = 1.0;
        // gl.uniform1f(scaleXUniformLocation, scaleX);

        // var scaleYUniformLocation = gl.getUniformLocation(program, 'scaleY');
        // var scaleY = 1.0;
        // gl.uniform1f(scaleYUniformLocation, scaleY);

        // var melebar = 1.0;

        function render(){
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            // Rotasi
            theta += thetaSpeed;
            // gl.uniform1f(thetaUniformLocation, theta);
            if(axis[z]) glMatrix.mat4.rotateZ(mm, mm, thetaSpeed);
            if(axis[y]) glMatrix.mat4.rotateY(mm, mm, thetaSpeed);
            if(axis[x]) glMatrix.mat4.rotateX(mm, mm, thetaSpeed);
            gl.uniformMatrix4fv(mmLoc, false, mm);

            var nm = glMatrix.mat3.create();
            glMatrix.mat3.normalFromMat4(nm, mm);
            gl.uniformMatrix3fv(nmLoc, false, nm);

            glMatrix.mat4.lookAt(vm, 
                [camera.x, camera.y, camera.z],
                [0.0, 0.0, -2.0],
                [0.0, 1.0, 0.0]
            );

            gl.uniformMatrix4fv(vmLoc, false, vm);
            //Skalasi
            // if(scaleX >= 1.0) melebar = -1.0;
            // else if (scaleX <= -1.0) melebar = -1.0;
            // scaleX += 0.01 * melebar;
            // gl.uniform1f(scaleXUniformLocation, scaleX);
            nama = 0;
            gl.uniform1i(gambarNamaLocation, nama);
            gl.drawArrays(gl.TRIANGLES, 0, countCube);
            nama = 2;
            gl.uniform1i(gambarNamaLocation, nama);
            gl.drawArrays(gl.TRIANGLES, 0, countName);
            requestAnimationFrame(render);
        }
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        //tekstur 
        var sampler0Loc = gl.getUniformLocation(program, 'sampler0');
        gl.uniform1i(sampler0Loc, 0);

        var texture = gl.createTexture();
        // gl.bindTexture(gl.TEXTURE_2D, texture);
        // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNISGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

        var image = new Image();
        image.src = "image/picture.jpg";
        image.addEventListener('load', function(){
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.generateMipmap(gl.TEXTURE_2D);
        });
        render();      
    }
})();