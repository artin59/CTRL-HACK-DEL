#include <Wire.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <SPI.h>

MAX30105 particleSensor;

const byte RATE_SIZE = 10; //Increase this for more averaging. 4 is good.
byte rates[RATE_SIZE]; //Array of heart rates
byte rateSpot = 0;
long lastBeat = 0; //Time at which the last beat occurred

float beatsPerMinute;
int beatAvg;
int beatAvgOld;
bool finger;
int count = 0;
const int button1 = 7;
char letter;
unsigned long previousMillis = 0;  
const long interval = 1000; 
char hello[11];

void setup()
{
  Serial.begin(115200);
  Serial.println("Initializing...");

  // Initialize sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println("MAX30105 was not found. Please check wiring/power. ");
    while (1);
  }
  Serial.println("Place your index finger on the sensor with steady pressure.");

  particleSensor.setup(); //Configure sensor with default settings
  particleSensor.setPulseAmplitudeRed(0x0A); //Turn Red LED to low to indicate sensor is running
  particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED

  pinMode(button, INPUT);
  digitalWrite(button, HIGH);

    hello[0]="_ ";
    hello[1]="_ ";
    hello[2]="_ ";
    hello[3]="_ ";
    hello[4]="_ ";
    hello[5]=" ";
    hello[6]="_ ";
    hello[7]="_ ";
    hello[8]="_ ";
    hello[9]="_ ";
    hello[10]="_";

}

void loop(){
    unsigned long currentMillis = millis();
  long irValue = particleSensor.getIR();

    if (irValue < 50000){
      if (count == 0){
        Serial.println(" No finger?");
        finger == false;
      }
    count=1;
  }
  else{

    if (checkForBeat(irValue) == true)
    {
      //We sensed a beat!
      long delta = millis() - lastBeat;
      lastBeat = millis();

      beatsPerMinute = 60 / (delta / 1000.0);

      if (beatsPerMinute < 255 && beatsPerMinute > 20)
      {
        rates[rateSpot++] = (byte)beatsPerMinute; //Store this reading in the array
        rateSpot %= RATE_SIZE; //Wrap variable

        //Take average of readings
        beatAvg = 0;
        beatAvgOld = 0;
        for (byte x = 0 ; x < RATE_SIZE ; x++)
          beatAvg += rates[x];
        
        beatAvg /= RATE_SIZE;
      }
    }

    //Serial.print("IR=");
    //Serial.print(irValue);
    //Serial.print(", BPM=");
    //Serial.print(beatsPerMinute);
    //Serial.print(", Avg BPM=");

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;  // Update the last print time
    Serial.println(beatAvg);

    for (int j=0; j<11;j++){
      Serial.print(hello[j]);
    }
    Serial.println("");
  }


    if (!digitalRead(button)){
      letter = (char)beatAvg;
      Serial.println(letter);

      if (letter=="H")
        hello[0]="H";
      else if(letter=="E")
        hello[1]="e";
      else if(letter=="L"){
        hello[2]="l";      
        hello[3]="l";
        hello[9]="l";
      }
      else if(letter=="O"){
        hello[4]="o";
        hello[7]="o";
      }
      else if(letter=="W")
        hello[6]="W";
      else if(letter=="R")
        hello[8]="r";
      else if(letter=="D")
        hello[10]="d";        
    }


  if (beatAvg != beatAvgOld && beatAvg >= 60){
    count = 0;
  }

  beatAvgOld = beatAvg;


  }
}


