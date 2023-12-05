import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [dayEvents, setDayEvents] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [eventText, setEventText] = useState('');

  const changeMonth = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDay(null);
  };

  const handleDayPress = (day) => {
    const dayKey = `${currentYear}-${currentMonth}-${day}`;
    setSelectedDay(dayKey);
    setEventText(dayEvents[dayKey] || '');
  };

  const saveEvent = () => {
    if (selectedDay && eventText.trim()) {
      setDayEvents({ ...dayEvents, [selectedDay]: eventText.trim() });
      setEventText('');
      setSelectedDay(null);
    }
  };

  const deleteEvent = (dayKey) => {
    const updatedEvents = { ...dayEvents };
    delete updatedEvents[dayKey];
    setDayEvents(updatedEvents);

    if (selectedDay === dayKey) {
      setSelectedDay(null);
      setEventText('');
    }
  };

  const renderCalendarDays = () => {
    let days = [];
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`blank-${i}`} style={styles.day} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayKey = `${currentYear}-${currentMonth}-${i}`;
      const eventForDay = dayEvents[dayKey];
      days.push(
        <View key={dayKey} style={styles.day}>
          <TouchableOpacity style={styles.dayButton} onPress={() => handleDayPress(i)}>
            <Text style={styles.dayText}>{i}</Text>
            {eventForDay && <Text style={styles.pinIcon}>📌</Text>}
            {eventForDay && (
              <TouchableOpacity onPress={() => deleteEvent(dayKey)} style={styles.deleteButton}>
                <Text style={styles.deleteText}>X</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      );
    }

    return <View style={styles.calendar}>{days}</View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.button}>
          <Text>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{`Month: ${currentMonth}, Year: ${currentYear}`}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.button}>
          <Text>Next</Text>
  </TouchableOpacity>
      </View>
      <ScrollView>
        {renderCalendarDays()}
      </ScrollView>
      {selectedDay && (
        <View style={styles.eventInputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setEventText}
            value={eventText}
            placeholder="nhập thông tin"
            multiline
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveEvent}>
            <Text>Lưu</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#CCCCFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#FF0033',
    borderRadius: 5,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 300,
  },
  day: {
    width: 40,
    height: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0099FF',
  },
  dayText: {
    fontSize: 16,
  },
  eventInputContainer: {
    padding: 10,
    alignItems: 'center',
  },
  input: {
    borderWidth: 4,
    borderColor: '#00AA00',
    padding: 15,
    width: '90%',
    marginBottom: 20,
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#add8e6',
    borderRadius: 5,
  },
  
});

export default App;
