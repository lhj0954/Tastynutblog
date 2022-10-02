FROM openjdk:11

ARG JAR_FILE=./build/libs/blogBack-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} blogBack.jar

ENTRYPOINT ["java", "-jar", "-Duser.timezones=Asia/Seoul", "/blogBack.jar"]
