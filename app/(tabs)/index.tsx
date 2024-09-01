import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Agenda, AgendaList, CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import { agendaItems, getMarkedDates } from "../../data/agendaitems";
import AgendaItem from "@/components/AgendaItem";
import Timeline from "@/components/Calendar/Timeline";
const ITEMS: any[] = agendaItems;

type AgendaItem = {
  name: string;
  time: string;
};

export default function Calendar() {
  const [selectedView, setSelectedView] = useState("agenda");
  const marked = useRef(getMarkedDates());

  // Sample data for the Agenda View
  const sampleData = {
    "2024-09-01": [{ name: "Meeting with client", time: "10:00 AM" }],
    "2024-09-03": [{ name: "Dentist appointment", time: "2:00 PM" }],
    "2024-09-05": [
      { name: "Lunch with team", time: "12:30 PM" },
      { name: "Project deadline", time: "5:00 PM" },
    ],
  };

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  const renderAgenda = () => (
    <Agenda
      items={sampleData}
      renderItem={(item: AgendaItem) => (
        <View style={styles.agendaItem}>
          <Text style={styles.agendaItemName}>{item.name}</Text>
          <Text style={styles.agendaItemTime}>{item.time}</Text>
        </View>
      )}
      // Specify what should be rendered instead of ActivityIndicator
      renderEmptyData={() => {
        return <View />;
      }}
      renderEmptyDate={() => (
        <View style={styles.emptyDate}>
          <Text>No events today</Text>
        </View>
      )}
      theme={{}}
    />
  );

  const renderAgendaList = () => (
    <CalendarProvider date={ITEMS[1]?.title} showTodayButton>
      <ExpandableCalendar
        // horizontal={false}
        // hideArrows
        // disablePan
        // hideKnob
        // initialPosition={ExpandableCalendar.positions.OPEN}
        // calendarStyle={styles.calendar}
        // headerStyle={styles.header} // for horizontal only
        // disableWeekScroll
        //theme={theme.current}
        // disableAllTouchEventsForDisabledDays
        firstDay={1}
        markedDates={marked.current}
        // animateScroll
        // closeOnDayPress={false}
      />
      <AgendaList
        sections={ITEMS}
        renderItem={renderItem}
        // scrollToNextEvent
        sectionStyle={styles.section}
        // dayFormat={'yyyy-MM-d'}
        // markedDates={{
        //   "2023-08-01": { marked: true, dotColor: "red" },
        //   "2023-08-03": { marked: true, dotColor: "green" },
        //   "2023-08-05": { marked: true, dotColor: "blue" },
        // }}
        // theme={{
        //   calendarBackground: "#f0f0f0",
        //   textSectionTitleColor: "#b6c1cd",
        //   selectedDayBackgroundColor: "#00adf5",
        //   selectedDayTextColor: "#ffffff",
        //   todayTextColor: "#00adf5",
        //   dayTextColor: "#2d4150",
        //   textDisabledColor: "#d9e1e8",
        //   dotColor: "#00adf5",
        //   selectedDotColor: "#ffffff",
        //   arrowColor: "orange",
        //   monthTextColor: "blue",
        //   indicatorColor: "blue",
        //   textDayFontWeight: "300",
        //   textMonthFontWeight: "bold",
        //   textDayHeaderFontWeight: "300",
        //   textDayFontSize: 16,
        //   textMonthFontSize: 16,
        //   textDayHeaderFontSize: 16,
        // }}
      />
    </CalendarProvider>
  );

  const renderTimeline = () => <Timeline />;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, selectedView === "agenda" && styles.selectedButton]}
          onPress={() => setSelectedView("agenda")}
        >
          <Text>Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedView === "agendaList" && styles.selectedButton]}
          onPress={() => setSelectedView("agendaList")}
        >
          <Text>Agenda List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedView === "timeline" && styles.selectedButton]}
          onPress={() => setSelectedView("timeline")}
        >
          <Text>Timeline</Text>
        </TouchableOpacity>
      </View>
      {selectedView === "agenda" && renderAgenda()}
      {selectedView === "agendaList" && renderAgendaList()}
      {selectedView === "timeline" && renderTimeline()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "#00adf5",
  },
  agendaItem: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  agendaItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  agendaItemTime: {
    fontSize: 14,
    color: "#888",
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  section: {
    backgroundColor: "#f2f7f7",
    color: "grey",
    textTransform: "capitalize",
  },
});
