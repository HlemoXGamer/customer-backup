import service from "./_client";

export function getServerTime() {
    return service.get("/server-time");
}