varying vec3 vPosition;
uniform float uSliceArc;
uniform float uSliceStart;

void main()
{

    float angle = atan(vPosition.y, vPosition.x);
    angle -= uSliceStart;
    angle = mod(angle, PI2);

    if (angle > uSliceStart && angle < uSliceStart + uSliceArc)
        discard;

        float csm_Slice;

}