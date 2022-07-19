import { GoblinSaxAPI } from "@goblinsax/gs-sdk";

test('adds 1 + 2 to equal 3', () => {
    let gs = new GoblinSaxAPI(1,2,3) 
    expect(1+2).toBe(3);
  });