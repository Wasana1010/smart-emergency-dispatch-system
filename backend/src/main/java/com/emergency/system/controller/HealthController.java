package com.emergency.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@RestController
public class HealthController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/api/health")
    public String checkHealth() {
        try (Connection connection = dataSource.getConnection()) {
            return "System UP and Database Connected: " + connection.getCatalog();
        } catch (SQLException e) {
            return "System UP but Database connection failed: " + e.getMessage();
        }
    }
}