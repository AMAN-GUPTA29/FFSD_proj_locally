#include <bits/stdc++.h>
using namespace std;

// flag for prev
// flag = 0  -> kuch nhi
// flag = 1  -> pos
// flag = 2  -> neg

int dp[1002][1002][3];
int solve(int ind, int prev, int flag, vector<int> &nums)
{
    if (ind >= nums.size())
        return 0;
    if (dp[ind][prev + 1][flag] != -1)
        return dp[ind][prev + 1][flag];
    int elSub = 0, elNsb = 0;
    if (prev == -1)
    {
        elSub = 1 + solve(ind + 1, ind, 0, nums);
    }
    else if (nums[ind] != nums[prev])
    {
        if (flag == 0)
        {
            int neg = nums[ind] - nums[prev];
            elSub = max(elSub, 1 + solve(ind + 1, ind, neg > 0 ? 1 : 2, nums));
        }
        else if (flag == 1 && nums[ind] - nums[prev] < 0)
        {
            elSub = 1 + solve(ind + 1, ind, 2, nums);
        }

        else if (flag == 2 && nums[ind] - nums[prev] > 0)
        {
            elSub = 1 + solve(ind + 1, ind, 1, nums);
        }
    }
    elNsb = 0 + solve(ind + 1, prev, flag, nums);
    return dp[ind][prev + 1][flag] = max(elSub, elNsb);
}
int wiggleMaxLength(vector<int> &nums)
{
    memset(dp, -1, sizeof dp);
    int ans = solve(0, -1, 0, nums);
    return ans == 0 ? 1 : ans;
}

int main()
{
}