import topicTest from "./Topic.test";
import storeTest from "./Store.test";
import v1Test from "./v1.test";

context("Topic", function() {
    topicTest();
});

context("Store", function() {
    storeTest();
});

context("routes/v1", function() {
    v1Test();
});