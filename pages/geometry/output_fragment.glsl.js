export default `#ifdef OPAQUE
diffuseColor.a=1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= transmissionAlpha+0.1;
#endif

gl_FragColor = vec4(outgoingLight,diffuseColor.a);
// gl_FragColor = vec4(outgoingLight,diffuseColor.a*vAlpha)
`;
