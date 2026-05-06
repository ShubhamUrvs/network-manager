package com.network.manager.models;

import lombok.Data;

@Data
public class ProcessInfo {
    private Integer pid;
    private String name;
    private String user;
    private Integer connections;
}
