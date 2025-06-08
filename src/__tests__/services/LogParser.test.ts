import { LogParser } from "../../services/LogParser";
import path from "path";
import fs from "fs";

describe("LogParser", () => {
  let logParser: LogParser;
  let mockLogContent: string;

  beforeEach(() => {
    logParser = new LogParser();
    mockLogContent = `
      0:00 InitGame: \\sv_floodProtect\\1\sv_maxPing\0\sv_minPing\0\sv_maxRate\\10000\sv_minRate\0\sv_hostname\Code Miner Server\g_gametype\0\sv_privateClients\\2\sv_maxclients\\16\sv_allowDownload\0\dmflags\0\fraglimit\\20\timelimit\\15\g_maxGameClients\0\capturelimit\\8\version\ioq3 1.36 linux-x86_64 Apr 12 2009\protocol\\68\mapname\q3dm17\gamename\baseq3\g_needpass\0
      0:25 ClientConnect: 2
      0:25 ClientUserinfoChanged: 2 n\\Dono da Bola\\t\\0\\model\\sarge/krusade\\hmodel\\sarge/krusade\\g_redteam\\\\g_blueteam\\\\c1\\\\5\\c2\\\\5\\hc\\\\95\\w\\0\\l\\0\\tt\\0\\tl\\0
      0:27 ClientUserinfoChanged: 2 n\\Mocinha\\t\\0\\model\\sarge\\hmodel\\sarge\\g_redteam\\\\g_blueteam\\\\c1\\\\4\\c2\\\\5\\hc\\\\95\\w\\0\\l\\0\\tt\\0\\tl\\0
      0:27 ClientBegin: 2
      0:29 Item: 2 weapon_rocketlauncher
      0:35 Item: 2 item_armor_shard
      0:35 Item: 2 item_armor_shard
      0:35 Item: 2 item_armor_shard
      0:35 Item: 2 item_armor_combat
      0:38 Item: 2 item_armor_shard
      0:38 Item: 2 item_armor_shard
      0:38 Item: 2 item_armor_shard
      0:55 Item: 2 item_health_large
      0:56 Item: 2 weapon_rocketlauncher
      0:57 Item: 2 ammo_rockets
      0:59 ClientConnect: 3
      0:59 ClientUserinfoChanged: 3 n\\Isgalamido\\t\\0\\model\\\\xian/default\\hmodel\\\\xian/default\\g_redteam\\\\g_blueteam\\\\c1\\\\4\\c2\\\\5\\hc\\\\100\\w\\0\\l\\0\\tt\\0\\tl\\0
      1:01 ClientUserinfoChanged: 3 n\\Isgalamido\\t\\0\\model\\\\uriel/zael\\hmodel\\\\uriel/zael\\g_redteam\\\\g_blueteam\\\\c1\\\\5\\c2\\\\5\\hc\\\\100\\w\\0\\l\\0\\tt\\0\\tl\\0
      1:01 ClientBegin: 3
      1:02 Item: 3 weapon_rocketlauncher
      1:04 Item: 2 item_armor_shard
      1:04 Item: 2 item_armor_shard
      1:04 Item: 2 item_armor_shard
      1:06 ClientConnect: 4
      1:06 ClientUserinfoChanged: 4 n\\Zeh\\t\\0\\model\\sarge/default\\hmodel\\sarge/default\\g_redteam\\\\g_blueteam\\\\c1\\\\5\\c2\\\\5\\hc\\\\100\\w\\0\\l\\0\\tt\\0\\tl\\0
      1:08 Kill: 3 2 6: Isgalamido killed Mocinha by MOD_ROCKET
      1:08 ClientUserinfoChanged: 4 n\\Zeh\\t\\0\\model\\sarge/default\\hmodel\\sarge/default\\g_redteam\\\\g_blueteam\\\\c1\\\\1\\c2\\\\5\\hc\\\\100\\w\\0\\l\\0\\tt\\0\\tl\\0
      1:08 ClientBegin: 4
      1:10 Item: 3 item_armor_shard
      1:10 Item: 3 item_armor_shard
      1:10 Item: 3 item_armor_shard
      1:10 Item: 3 item_armor_combat
      1:11 Item: 4 weapon_shotgun
      1:11 Item: 4 ammo_shells
      1:16 Item: 4 item_health_large
      1:18 Item: 4 weapon_rocketlauncher
      1:18 Item: 4 ammo_rockets
      1:26 Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT
      1:26 ClientUserinfoChanged: 2 n\\Dono da Bola\\t\\0\\model\\sarge\\hmodel\\sarge\\g_redteam\\\\g_blueteam\\\\c1\\\\4\\c2\\\\5\\hc\\\\95\\w\\0\\l\\0\\tt\\0\\tl\\0
      1:26 Item: 3 weapon_railgun
      1:29 Item: 2 weapon_rocketlauncher
      1:29 Item: 3 weapon_railgun
      1:32 Item: 3 weapon_railgun
      1:32 Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT
      1:35 Item: 2 item_armor_shard
      1:35 Item: 2 item_armor_shard
      1:35 Item: 2 item_armor_shard
      1:35 Item: 3 weapon_railgun
      1:38 Item: 2 item_health_large
      1:38 Item: 3 weapon_railgun
      1:41 Kill: 1022 2 19: <world> killed Dono da Bola by MOD_FALLING
      1:41 Item: 3 weapon_railgun
      1:43 Item: 2 ammo_rockets
      1:44 Item: 2 weapon_rocketlauncher
      1:46 Item: 2 item_armor_shard
      1:47 Item: 2 item_armor_shard
      1:47 Item: 2 item_armor_shard
      1:47 ShutdownGame:
      1:47 ------------------------------------------------------------
    `;
  });

  describe("parseLogFile", () => {
    it("should parse log file correctly", async () => {
      const tempLogPath = path.join(__dirname, "temp.log");
      fs.writeFileSync(tempLogPath, mockLogContent);

      const result = await logParser.parseLogFile(tempLogPath);

      expect(result).toBeDefined();
      expect(result.game_1).toBeDefined();

      // Game 1 assertions
      expect(result.game_1.total_kills).toBe(4);
      expect(result.game_1.players).toContain("Isgalamido");
      expect(result.game_1.players).toContain("Mocinha");
      expect(result.game_1.players).toContain("Zeh");
      expect(result.game_1.players).toContain("Dono da Bola");
      expect(result.game_1.kills.Isgalamido).toBe(1); // 1 kill
      expect(result.game_1.kills.Zeh).toBe(-2); // 2 mortes pelo mundo
      expect(result.game_1.kills["Dono da Bola"]).toBe(-1); // 1 morte pelo mundo

      fs.unlinkSync(tempLogPath);
    });

    it("should handle world kills correctly", async () => {
      const worldKillLog = `
        0:00 InitGame: \\sv_floodProtect\\1
        15:00 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT
        15:01 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT
        2:24 ShutdownGame:
      `;
      const tempLogPath = path.join(__dirname, "temp.log");
      fs.writeFileSync(tempLogPath, worldKillLog);

      const result = await logParser.parseLogFile(tempLogPath);

      expect(result.game_1.total_kills).toBe(2);
      expect(result.game_1.kills.Isgalamido).toBe(-2);
      expect(result.game_1.players).not.toContain("<world>");

      fs.unlinkSync(tempLogPath);
    });

    it("should handle multiple games correctly", async () => {
      const multiGameLog = `
        0:00 InitGame: \\sv_floodProtect\\1
        15:00 Kill: 2 3 7: Isgalamido killed Mocinha by MOD_ROCKET_SPLASH
        2:24 ShutdownGame:
        0:00 InitGame: \\sv_floodProtect\\1
        15:00 Kill: 3 2 7: Mocinha killed Isgalamido by MOD_ROCKET_SPLASH
        2:24 ShutdownGame:
      `;
      const tempLogPath = path.join(__dirname, "temp.log");
      fs.writeFileSync(tempLogPath, multiGameLog);

      const result = await logParser.parseLogFile(tempLogPath);

      expect(Object.keys(result).length).toBe(2);
      expect(result.game_1.total_kills).toBe(1);
      expect(result.game_2.total_kills).toBe(1);

      fs.unlinkSync(tempLogPath);
    });

    it("should handle empty games correctly", async () => {
      const emptyGameLog = `
        0:00 InitGame: \\sv_floodProtect\\1
        2:24 ShutdownGame:
      `;
      const tempLogPath = path.join(__dirname, "temp.log");
      fs.writeFileSync(tempLogPath, emptyGameLog);

      const result = await logParser.parseLogFile(tempLogPath);

      expect(result.game_1.total_kills).toBe(0);
      expect(result.game_1.players).toHaveLength(0);
      expect(Object.keys(result.game_1.kills)).toHaveLength(0);

      fs.unlinkSync(tempLogPath);
    });
  });
});
