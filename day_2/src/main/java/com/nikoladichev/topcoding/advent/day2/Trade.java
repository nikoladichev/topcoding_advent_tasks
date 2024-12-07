package com.nikoladichev.topcoding.advent.day2;

import java.time.LocalDateTime;

public record Trade (LocalDateTime dateTime, double price, long volume) {}
