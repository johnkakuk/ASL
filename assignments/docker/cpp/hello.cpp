#include <iostream>
#include <ctime>

int main() {
    std::cout << "Hello ASL" << std::endl;
    time_t now = time(0);
    char buf[11];
    strftime(buf, sizeof(buf), "%Y-%m-%d", localtime(&now));
    std::cout << buf << std::endl;
    return 0;
}
