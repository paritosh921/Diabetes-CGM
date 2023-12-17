import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

const GlucoseInfoCard = () => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>Blood Glucose Levels</Text>
        <Paragraph>
          Normal levels for people without diabetes:
          <Text style={styles.text}>
            Fasting: 70-100 mg/dL 
            2 hours after a meal: Less than 140 mg/dL
          </Text>
        </Paragraph>

        <Paragraph>  
          Recommended levels for people with diabetes:  
          <Text style={styles.text}>
            Fasting: 80-130 mg/dL
            Before meals: 80-130 mg/dL
            1-2 hours after a meal: Less than 180 mg/dL 
          </Text>
        </Paragraph>

        <Paragraph>
          The A1C test (2-3 month average):
          <Text style={styles.text}>
            Without diabetes: Below 5.7% 
            With diabetes: Less than 7%  
          </Text>
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 12, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold' 
  },
  text: {
    fontWeight: '600'
  }
});

export default GlucoseInfoCard;