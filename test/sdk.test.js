import chai from "chai";
import chaiHttp from "chai-http";
import SuperagentSDK from "../src/superagent.js";

const API_TOKEN = "1c9d14f44fc7492990148e003541577d";
const expect = chai.expect;
const superagent = new SuperagentSDK(API_TOKEN);

chai.use(chaiHttp);

describe("Prompts", () => {
  let prompt;

  it("should create a prompt", async () => {
    const { success, data } = await superagent.prompts().create({
      name: "Test",
      template: "My template {human_input} {chat_history}",
      input_variables: ["human_input", "chat_history"],
    });

    prompt = data;

    expect(success).to.equal(true);
    expect(data).to.be.an("object");
  });

  it("should retrieve a list of prompts", async () => {
    const { success, data } = await superagent.prompts().list();
    expect(success).to.equal(true);
    expect(data).to.be.an("array");
  });

  it("should retrieve a single prompt", async () => {
    const { success, data } = await superagent.prompts().get(prompt.id);

    expect(success).to.equal(true);
    expect(data).to.be.an("object");
  });

  it("should delete a single prompt", async () => {
    const { success, data } = await superagent.prompts().delete(prompt.id);

    expect(success).to.equal(true);
    expect(data).to.equal(null);
  });
});

describe("Documents", () => {
  let document;

  it("should create a document", async () => {
    const { success, data } = await superagent.documents().create({
      name: "Test",
      url: "https://digitalassets.tesla.com/tesla-contents/image/upload/IR/TSLA-Q1-2023-Update",
      type: "PDF",
    });

    document = data;

    expect(success).to.equal(true);
    expect(data).to.be.an("object");
  });

  it("should retrieve a list of documents", async () => {
    const { success, data } = await superagent.documents().list();

    expect(success).to.equal(true);
    expect(data).to.be.an("array");
  });

  it("should retrieve a single document", async () => {
    const { success, data } = await superagent.documents().get(document.id);

    expect(success).to.equal(true);
    expect(data).to.be.an("object");
  });

  it("should delete a single document", async () => {
    const { success, data } = await superagent.documents().delete(document.id);

    expect(success).to.equal(true);
    expect(data).to.equal(null);
  });
});

describe("Agents", () => {
  let agent;

  it("should create an agent", async () => {
    const { success, data } = await superagent.agents().create({
      name: "Test agent",
      type: "REACT",
      has_memory: true,
      llm: { provider: "openai-chat", model: "gpt-3.5-turbo" },
    });

    agent = data;

    expect(success).to.equal(true);
    expect(data).to.be.an("object");
  });

  it("should retrieve a list of agents", async () => {
    const { success, data } = await superagent.agents().list();

    expect(success).to.equal(true);
    expect(data).to.be.an("array");
  });

  it("should retrieve a single agent", async () => {
    const { success, data } = await superagent.agents().get(agent.id);

    expect(success).to.equal(true);
    expect(data).to.be.an("object");
  });

  it("should run a single agent", async () => {
    const { success, data } = await superagent.agents().predict({
      id: agent.id,
      input: { human_input: "hi" },
      has_streaming: false,
    });

    expect(success).to.equal(true);
    expect(data).to.be.a("string");
  });

  it("should delete a single agent", async () => {
    const { success, data } = await superagent.agents().delete(agent.id);

    expect(success).to.equal(true);
    expect(data).to.equal(null);
  });
});
