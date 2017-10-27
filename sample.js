/**
 * Created by aghumnar on 10/27/2017.
 */

/**
 * Created by aghumnar on 10/26/2017.
 */
//regression
// Supervise
// Classification
// clustering no label data
/*  Styles
 Decision Tree
 */
var brain = require('brain'),
    classifier = require('classifier');

var net = new brain.NeuralNetwork();

net.train([{input: [0, 0], output: [0]},
    {input: [0, 1], output: [1]},
    {input: [1, 0], output: [1]},
    {input: [1, 1], output: [0]}]);

var output = net.run([1, 1]);  // [0.933]
console.log(output);

//Abdominal Pain, Blood in Urine, Flank Pain, Low Back Pain,  //Kidney Stone
//Chest Pain, Decreased Urine Output, Dizziness, Leg Swelling, Shortness of Breath // High Blood Pressure
//Cough, runny nose, sore throat, sneezing Secondary :  fever, Watery eyes,  Headache, Fatigue, Body aches  //common cold
//Blurred vision, Feeling faint, Shortness of breath, Low blood pressure, Weakness (generalized), Fatigue, Lightheadedness, Fainting, Difficulty standing //dibeties 1

/*    //Nasal congestion
 Decreased smell
 Runny nose
 Pain or discomfort
 Noisy breathing
 Snoring

 //Indoor Allergens
 Sneezing
 Cough
 Runny nose
 //*/

var bayes = new classifier.Bayesian();

bayes.train("Cough, runny nose, Abdominal Pain, fever, Flank Pain, Low Back Pain", 'Kidney Stone');
bayes.train("Chest Pain, Decreased Urine Output, Dizziness, Leg Swelling, Shortness of Breath", 'High Blood Pressure');
bayes.train("Cough, runny nose, sore throat, sneezing , fever, Watery eyes,  Headache, Fatigue, Body aches", 'Common Cold');

var category = bayes.classify("fever, Blood in Urine, Shortness of Breath");

console.log(category);