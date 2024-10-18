// Function to rank faucets based on badges and features
export const rankFaucets = (faucets: any[]) => {
    return faucets.sort((a, b) => {
      const rank = (faucet: any) => {
        let score = 0;
  
        // Prioritization logic: higher score means worse faucet
        if (faucet.mainnetTokenBalanceRequired) score += 11;
        if (faucet.isPOW) score += 5;
        if (faucet.socialLogin) score += 4;
        if (faucet.captcha) score += 3;
        if (faucet.isOfficial) score += 2;
        if (!faucet.captcha && !faucet.socialLogin && !faucet.mainnetTokenBalanceRequired) score += 1; // Best option (no badges)
  
        return score;
      };
  
      // Compare faucets based on their calculated rank
      return rank(a) - rank(b);
    });
  };