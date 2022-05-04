# Art's Generative Art
Using Javascript (and a lot of math) to create dynamically-made art; a work-in-progress.

## Description
The idea behind this project is to create a site with Javascript (and a little CSS) that will generate artwork using dynamically created DOM elements. There's no set goal or finish line here - it's an open-ended project that I'm trying to chip away at when I have some free time, and to see where it goes.

## Current Version:

![Document 5-3-2022 8-03-34 PM](https://user-images.githubusercontent.com/97937045/166631494-9c80a3dd-8bfd-4685-911c-cf135f8842c3.png)

* "New Art" button to generate a new image
* Three layers - SVG lines, 50 larger boxes, then 100 smaller boxes
* Each layer gets randomly assigned a different colour palette (represented in the top left). If you like the palette, you can click on its box to "lock" it in, and it will persist through any future artwork generations
* Box layers cluster around a randomly assigned point - as the boxes are created, the "gravity" of the point increases. Subsequent boxes are more likely to appear closer to the point, and more likely to be smaller
* In addition, each box's position is influenced by the previous box

The idea is to have a "random" piece of art, but still retain some dynamics - areas of larger shapes vs smaller, similar colours grouped together that contrast with other areas of colours.

**Next steps** will be to fix the lines in the background - they're a little too "uniformly" random at the moment - and to perhaps give the user more control over some of the variables that go into making the artwork behind-the-scenes.

## Previous Versions:

![1 - after ex 2](https://user-images.githubusercontent.com/97937045/166633901-e4771ef1-a720-4c88-8f40-3c3e835e6ed0.png)

1. Just randomly placed boxes, with a single simple colour palette.

---

![6 - mid ex 3](https://user-images.githubusercontent.com/97937045/166634056-b9b07fe0-d1a3-4528-8c3c-3dc2031a5b09.png)

2. Introduced the cluster points, now visible on the screen, but their gravity is a little too low. Added a second colour palette, but the boxes are too large to really notice it.

---

![7 - mar1](https://user-images.githubusercontent.com/97937045/166634247-be55b0ee-f45b-4904-8a71-55e562b4f63c.png)

3. More interesting colours, and reduced box sizes.
