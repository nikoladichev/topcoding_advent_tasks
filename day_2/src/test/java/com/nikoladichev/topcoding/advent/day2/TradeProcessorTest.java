package com.nikoladichev.topcoding.advent.day2;

import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileNotFoundException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import static org.junit.jupiter.api.Assertions.*;

class TradeProcessorTest {

  @Test
  void processTrades() {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    List<Trade> trades = new ArrayList<>();
    File file = new File(getClass().getClassLoader().getResource("trades.csv").getFile());
    try (Scanner scanner = new Scanner(file)) {
      while (scanner.hasNextLine()) {
        String[] split = scanner.nextLine().split(",");
        var dateTime = LocalDateTime.parse(split[0], dtf);
        double price = Double.parseDouble(split[1]);
        long volume = Long.parseLong(split[2].replaceAll(" ", ""));

        trades.add(new Trade(dateTime, price, volume));
      }
    } catch (FileNotFoundException e) {
      fail("File not found");
    }

    TradeProcessor processor = new TradeProcessor();
    List<Interval> intervals = processor.processTrades(trades);

    assertEquals(intervals.size(), 133);

    var first = intervals.get(0);
    assertEquals("2023-11-14_11:0:00", first.dateTime());
    assertEquals(0.89212, first.first());
    assertEquals(0.89303, first.max());
    assertEquals(0.89169, first.min());
    assertEquals(0.89209, first.last());
    assertEquals(13914741000L, first.volume());
    var last = intervals.get(intervals.size() - 1);

    assertEquals("2023-11-14_22:0:00", last.dateTime());
    assertEquals(0.88647, last.first());
    assertEquals(0.88709, last.max());
    assertEquals(0.8861, last.min());
    assertEquals(0.88709, last.last());
    assertEquals(53349543000L, last.volume());

    for (var i : intervals) {
      System.out.println(
          i.dateTime()
              + " "
              + i.first()
              + " "
              + i.max()
              + " "
              + i.min()
              + " "
              + i.last()
              + " "
              + i.volume());
    }
  }
}
