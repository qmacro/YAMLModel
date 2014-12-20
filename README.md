YAMLModel
=========

Scratching an itch - Experimental YAML Client Model for UI5. 

Often I find myself wanting to create some test data quickly, and by hand, for use in a client side model in UI5.
The problem is that XML and JSON are not all that easy to type in, with the various syntax constraints. Enter our
old friend [http://www.yaml.org/](YAML), that I first came across in my Perl days. Lovely data syntax with a nice
balance of significant whitespace, easy entry and good data structure support. Could be ideal! 

So to consume hand-crafted test data written in YAML, I wrote this experimental YAML Model mechanism for UI5. It
is based upon the JSON Model and is not very feature rich at the moment but does exactly what I want to do, which
is to allow me to consume data I've created in YAML, and bring that data into a client model.

See http://youtu.be/-8SIasBQc5U for a quick demo.
