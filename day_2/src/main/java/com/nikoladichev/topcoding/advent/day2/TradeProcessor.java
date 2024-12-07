package com.nikoladichev.topcoding.advent.day2;

import java.time.LocalDateTime;
import java.util.*;

public class TradeProcessor {
    public List<Interval> processTrades(List<Trade> trades) {
        Map<String, List<Trade>> map = new HashMap<>();
        for (var trade: trades) {
            var key = buildKey(trade.dateTime());
            var tradesInInterval = map.getOrDefault(key, new ArrayList<>());
            tradesInInterval.add(trade);
            map.put(key, tradesInInterval);
        }

        var orderedKeys = new TreeSet<>(map.keySet());
        List<Interval> result = new ArrayList<>();
        for (var key : orderedKeys) {
            var list = map.get(key);
            double min = Double.MAX_VALUE;
            double max = Double.MIN_VALUE;
            Trade first = list.get(0);
            Trade last = list.get(0);
            long volume = 0;
            for (var trade: list) {
                min = Math.min(trade.price(), min);
                max = Math.max(trade.price(), max);
                first = trade.dateTime().isBefore(first.dateTime()) ? trade : first;
                last = trade.dateTime().isAfter(last.dateTime()) ? trade : last;
                volume += trade.volume();
            }

            result.add(new Interval(key, first.price(), max, min, last.price(), volume));
        }

        return result;
    }

    private String buildKey(LocalDateTime dt) {
        var minuteRemainder = dt.getMinute() % 5;
        return new StringBuilder()
                .append(dt.getYear()).append('-')
                .append(dt.getMonthValue()).append('-')
                .append(dt.getDayOfMonth()).append('_')
                .append(dt.getHour()).append(':')
                .append(dt.getMinute() - minuteRemainder).append(':')
                .append("00")
                .toString();
    }
}
